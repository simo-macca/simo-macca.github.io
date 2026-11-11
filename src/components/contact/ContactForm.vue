<script setup>
import { computed, reactive, ref, watch } from 'vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import FormAlert from '@/components/contact/FormAlert.vue'
import FormField from '@/components/contact/FormField.vue'
import SendButton from '@/components/contact/SendButton.vue'
import { useLanguageStore } from '@/stores/language.js'
import { useThemeStore } from '@/stores/theme.js'

/**
 * Contact form backed by Web3Forms, with optional hCaptcha.
 *
 * Environment (set as GitHub Actions secrets for production builds):
 * - VITE_WEB3FORMS_KEY      without it, submissions are simulated locally
 * - VITE_HCAPTCHA_SITEKEY   without it, the captcha is not rendered
 */
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITEKEY
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const theme = useThemeStore()
const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.contact)

const form = reactive({ name: '', email: '', message: '', botcheck: false })

// Errors are stored as translation keys so they follow language changes.
const errorKeys = reactive({ name: '', email: '', message: '', captcha: '', general: '' })
const errors = computed(() =>
  Object.fromEntries(
    Object.entries(errorKeys).map(([field, key]) => [field, key ? t.value.validation[key] : '']),
  ),
)

const showSuccess = ref(false)
const captchaToken = ref(null)
const captchaRef = ref(null)
const submitButton = ref(null)

const captchaTheme = computed(() => (theme.isDark ? 'dark' : 'light'))
const captchaLanguage = computed(() => (languageStore.isItalian ? 'it' : 'en'))
// Re-mounting the widget is the only way to change its theme/language.
const captchaKey = computed(() => `${captchaTheme.value}-${captchaLanguage.value}`)

// A re-mounted widget starts unsolved: drop the stale token.
watch(captchaKey, () => {
  captchaToken.value = null
})

function clearError(field) {
  errorKeys[field] = ''
  errorKeys.general = ''
  showSuccess.value = false
}

function validate() {
  const name = form.name.trim()
  const email = form.email.trim()
  const message = form.message.trim()

  errorKeys.name = !name ? 'nameRequired' : name.length < 2 ? 'nameMin' : ''
  errorKeys.email = !email ? 'emailRequired' : !EMAIL_PATTERN.test(email) ? 'emailInvalid' : ''
  errorKeys.message = !message ? 'messageRequired' : message.length < 10 ? 'messageMin' : ''
  errorKeys.captcha = HCAPTCHA_SITEKEY && !captchaToken.value ? 'captchaRequired' : ''
  errorKeys.general = ''

  return !errorKeys.name && !errorKeys.email && !errorKeys.message && !errorKeys.captcha
}

function resetForm() {
  form.name = ''
  form.email = ''
  form.message = ''
  captchaToken.value = null
  captchaRef.value?.reset?.()
}

async function sendMessage() {
  if (!WEB3FORMS_ACCESS_KEY) {
    console.warn('VITE_WEB3FORMS_KEY is not defined: simulating a successful submission.')
    return
  }

  const payload = {
    access_key: WEB3FORMS_ACCESS_KEY,
    name: form.name.trim(),
    email: form.email.trim(),
    message: form.message.trim(),
    subject: 'Portfolio Inquiry - Simone Maccario',
    from_name: 'Simone Maccario Portfolio Contact',
    botcheck: form.botcheck,
  }
  if (captchaToken.value) payload['h-captcha-response'] = captchaToken.value

  const response = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(payload),
  })
  const result = await response.json().catch(() => ({}))

  if (!response.ok || !result.success) {
    throw new Error(result.message || `Web3Forms request failed (${response.status})`)
  }
}

async function onSubmit() {
  showSuccess.value = false
  if (!validate() || !submitButton.value) return

  await submitButton.value.submit(async () => {
    try {
      await sendMessage()
      resetForm()
      showSuccess.value = true
    } catch (error) {
      errorKeys.general = 'submitFailed'
      // A token can be used only once: require a fresh captcha for the retry.
      captchaToken.value = null
      captchaRef.value?.reset?.()
      throw error
    }
  })
}
</script>

<template>
  <form
    class="flex flex-col surface-card p-6 sm:p-8"
    :aria-label="t.formAria"
    novalidate
    @submit.prevent="onSubmit"
  >
    <h3 class="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-mist-100">
      {{ t.formTitle }}
    </h3>
    <p class="mb-6 text-sm text-slate-600 dark:text-mist-400">{{ t.formSubtitle }}</p>

    <FormAlert :message="errors.general" variant="error" />
    <FormAlert :message="showSuccess ? t.successMessage : ''" variant="success" />

    <div class="space-y-4">
      <FormField
        id="contact-name"
        v-model="form.name"
        :label="t.nameLabel"
        :error="errors.name"
        :placeholder="t.namePlaceholder"
        autocomplete="name"
        @update:model-value="clearError('name')"
      />
      <FormField
        id="contact-email"
        v-model="form.email"
        type="email"
        :label="t.emailLabel"
        :error="errors.email"
        :placeholder="t.emailPlaceholder"
        autocomplete="email"
        @update:model-value="clearError('email')"
      />
      <FormField
        id="contact-message"
        v-model="form.message"
        type="textarea"
        :rows="5"
        :label="t.messageLabel"
        :error="errors.message"
        :placeholder="t.messagePlaceholder"
        @update:model-value="clearError('message')"
      />
    </div>

    <!-- Honeypot: invisible to people, often filled in by bots (checked by Web3Forms) -->
    <input
      v-model="form.botcheck"
      type="checkbox"
      name="botcheck"
      class="hidden"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
    />

    <div v-if="HCAPTCHA_SITEKEY" class="mt-4 flex flex-col items-center">
      <VueHcaptcha
        :key="captchaKey"
        ref="captchaRef"
        :sitekey="HCAPTCHA_SITEKEY"
        :theme="captchaTheme"
        :language="captchaLanguage"
        @verify="
          (token) => {
            captchaToken = token
            errorKeys.captcha = ''
          }
        "
        @expired="captchaToken = null"
      />
      <p v-if="errors.captcha" class="mt-1 text-xs text-rose-500" role="alert">
        {{ errors.captcha }}
      </p>
    </div>

    <SendButton ref="submitButton" />

    <p
      class="mt-6 border-t border-slate-200/80 pt-4 text-center text-xs text-slate-500 dark:border-white/8 dark:text-mist-400"
    >
      {{ t.footerNote }}
    </p>
  </form>
</template>
