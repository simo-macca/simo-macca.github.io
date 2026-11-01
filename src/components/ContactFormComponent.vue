<script setup>
import { computed, ref, reactive } from 'vue'
import SendButtonComponent from '@/components/SendButtonComponent.vue'
import FormField from '@/components/contact/FormField.vue'
import FormAlert from '@/components/contact/FormAlert.vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import { useThemeStore } from '@/stores/ThemeStore.js'
import { useLanguageStore } from '@/stores/LanguageStore.js'

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITEKEY

const form = reactive({
  name: '',
  email: '',
  message: '',
})

const errors = reactive({
  name: '',
  email: '',
  message: '',
  captcha: '',
  general: '',
})

const hCaptchaToken = ref(null)
const hCaptchaComponent = ref(null)
const btn = ref(null)
const theme = useThemeStore()
const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.contact)

const captchaTheme = computed(() => (theme.isDark ? 'dark' : 'light'))

const validateEmail = (val) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)
}

const validate = () => {
  let isValid = true
  errors.name = ''
  errors.email = ''
  errors.message = ''
  errors.captcha = ''
  errors.general = ''

  if (!form.name.trim()) {
    errors.name = t.value.validation.nameRequired
    isValid = false
  } else if (form.name.trim().length < 2) {
    errors.name = t.value.validation.nameMin
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = t.value.validation.emailRequired
    isValid = false
  } else if (!validateEmail(form.email.trim())) {
    errors.email = t.value.validation.emailInvalid
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = t.value.validation.messageRequired
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.message = t.value.validation.messageMin
    isValid = false
  }

  if (HCAPTCHA_SITEKEY && !hCaptchaToken.value) {
    errors.captcha = t.value.validation.captchaRequired
    isValid = false
  }

  return isValid
}

const onVerify = (token) => {
  hCaptchaToken.value = token
  errors.captcha = ''
}

const onExpire = () => {
  hCaptchaToken.value = null
}

const submitForm = async () => {
  if (!validate()) {
    return
  }

  if (!btn.value) return

  await btn.value.submit(async () => {
    if (!WEB3FORMS_ACCESS_KEY) {
      console.warn('VITE_WEB3FORMS_KEY is not defined. Simulating successful submission.')
      form.name = ''
      form.email = ''
      form.message = ''
      hCaptchaToken.value = null
      if (hCaptchaComponent.value && typeof hCaptchaComponent.value.reset === 'function') {
        hCaptchaComponent.value.reset()
      }
      return
    }

    const payload = {
      access_key: WEB3FORMS_ACCESS_KEY,
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
      subject: 'Portfolio Inquiry - Simone Maccario',
      from_name: 'Simone Maccario Portfolio Contact',
    }

    if (hCaptchaToken.value) {
      payload['h-captcha-response'] = hCaptchaToken.value
    }

    const resp = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(payload),
    })

    const result = await resp.json()

    if (!result.success) {
      errors.general = result.message || t.value.validation.submitFailed
      throw new Error(errors.general)
    }

    form.name = ''
    form.email = ''
    form.message = ''
    hCaptchaToken.value = null
    if (hCaptchaComponent.value && typeof hCaptchaComponent.value.reset === 'function') {
      hCaptchaComponent.value.reset()
    }
  })
}
</script>

<template>
  <form
    @submit.prevent="submitForm"
    novalidate
    class="flex flex-col rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-xs backdrop-blur-sm sm:p-8 dark:border-white/8 dark:bg-[#111827]/80"
    aria-label="Contact form"
  >
    <div>
      <h2 class="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F3F4F6]">
        {{ t.formTitle }}
      </h2>
      <p class="mb-6 text-sm text-slate-600 dark:text-[#9CA3AF]">
        {{ t.formSubtitle }}
      </p>

      <FormAlert :message="errors.general" variant="error" />

      <div class="space-y-4">
        <FormField
          id="contact-name"
          :label="t.nameLabel"
          v-model="form.name"
          :error="errors.name"
          @input="errors.name = ''"
          :placeholder="t.namePlaceholder"
          autocomplete="name"
        />

        <FormField
          id="contact-email"
          :label="t.emailLabel"
          type="email"
          v-model="form.email"
          :error="errors.email"
          @input="errors.email = ''"
          :placeholder="t.emailPlaceholder"
          autocomplete="email"
        />

        <FormField
          id="contact-message"
          :label="t.messageLabel"
          type="textarea"
          v-model="form.message"
          :error="errors.message"
          @input="errors.message = ''"
          rows="4"
          :placeholder="t.messagePlaceholder"
        />
      </div>

      <!-- Optional HCaptcha -->
      <div v-if="HCAPTCHA_SITEKEY" class="mt-4 flex flex-col items-center">
        <VueHcaptcha
          ref="hCaptchaComponent"
          :key="`${captchaTheme}-${languageStore.currentLanguage}`"
          :sitekey="HCAPTCHA_SITEKEY"
          class="h-captcha flex justify-center"
          :data-theme="captchaTheme"
          :language="languageStore.isItalian ? 'it' : 'en-US'"
          @verify="onVerify"
          @expired="onExpire"
        />
        <p v-if="errors.captcha" class="mt-1 text-xs text-rose-500" role="alert">
          {{ errors.captcha }}
        </p>
      </div>

      <SendButtonComponent ref="btn" />
    </div>

    <div class="mt-6 border-t border-slate-200/80 pt-4 dark:border-white/8">
      <p class="text-center text-xs text-slate-500 dark:text-[#9CA3AF]">
        {{ t.footerNote }}
      </p>
    </div>
  </form>
</template>
