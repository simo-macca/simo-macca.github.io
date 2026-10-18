<script setup>
import { computed, ref, reactive } from 'vue'
import SendButtonComponent from '@/components/SendButtonComponent.vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import { useThemeStore } from '@/stores/ThemeStore.js'
import { AlertCircle } from '@lucide/vue'

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
    errors.name = 'Please enter your name.'
    isValid = false
  } else if (form.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters.'
    isValid = false
  }

  if (!form.email.trim()) {
    errors.email = 'Please enter your email address.'
    isValid = false
  } else if (!validateEmail(form.email.trim())) {
    errors.email = 'Please enter a valid email address.'
    isValid = false
  }

  if (!form.message.trim()) {
    errors.message = 'Please enter a message.'
    isValid = false
  } else if (form.message.trim().length < 10) {
    errors.message = 'Message must be at least 10 characters long.'
    isValid = false
  }

  if (HCAPTCHA_SITEKEY && !hCaptchaToken.value) {
    errors.captcha = 'Please complete the captcha verification.'
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
    // If Web3Forms key is not provided (e.g. preview/local environment)
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
      errors.general = result.message || 'Submission failed. Please try again.'
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
    class="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/80 p-6 shadow-xs backdrop-blur-sm sm:p-8 dark:border-slate-800/80 dark:bg-slate-900/70"
    aria-label="Contact form"
  >
    <div>
      <h2 class="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
        Send Me a Message
      </h2>
      <p class="mb-6 text-sm text-slate-600 dark:text-slate-400">
        Have a technical question, research idea, or engineering opportunity? Let's connect.
      </p>

      <div
        v-if="errors.general"
        class="mb-4 flex items-center gap-2 rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700 dark:border-red-900/40 dark:bg-red-950/30 dark:text-red-400"
        role="alert"
      >
        <AlertCircle class="h-4 w-4 shrink-0" />
        <span>{{ errors.general }}</span>
      </div>

      <div class="space-y-4">
        <!-- Name Field -->
        <div>
          <label
            for="contact-name"
            class="block text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Your Name <span class="text-rose-500">*</span>
          </label>
          <input
            v-model="form.name"
            @input="errors.name = ''"
            type="text"
            id="contact-name"
            name="name"
            required
            :aria-invalid="Boolean(errors.name)"
            :aria-describedby="errors.name ? 'contact-name-error' : undefined"
            class="mt-1.5 w-full rounded-xl border bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-900 dark:focus:ring-sky-400"
            :class="
              errors.name
                ? 'border-rose-400 dark:border-rose-500'
                : 'border-slate-200 dark:border-slate-800'
            "
            placeholder="Ada Lovelace"
            autocomplete="name"
          />
          <p
            v-if="errors.name"
            id="contact-name-error"
            class="mt-1 text-xs text-rose-500"
            role="alert"
          >
            {{ errors.name }}
          </p>
        </div>

        <!-- Email Field -->
        <div>
          <label
            for="contact-email"
            class="block text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Email Address <span class="text-rose-500">*</span>
          </label>
          <input
            v-model="form.email"
            @input="errors.email = ''"
            type="email"
            id="contact-email"
            name="email"
            required
            :aria-invalid="Boolean(errors.email)"
            :aria-describedby="errors.email ? 'contact-email-error' : undefined"
            class="mt-1.5 w-full rounded-xl border bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-900 dark:focus:ring-sky-400"
            :class="
              errors.email
                ? 'border-rose-400 dark:border-rose-500'
                : 'border-slate-200 dark:border-slate-800'
            "
            placeholder="ada@example.com"
            autocomplete="email"
          />
          <p
            v-if="errors.email"
            id="contact-email-error"
            class="mt-1 text-xs text-rose-500"
            role="alert"
          >
            {{ errors.email }}
          </p>
        </div>

        <!-- Message Field -->
        <div>
          <label
            for="contact-message"
            class="block text-xs font-semibold tracking-wider text-slate-600 uppercase dark:text-slate-300"
          >
            Your Message <span class="text-rose-500">*</span>
          </label>
          <textarea
            v-model="form.message"
            @input="errors.message = ''"
            id="contact-message"
            name="message"
            rows="4"
            required
            :aria-invalid="Boolean(errors.message)"
            :aria-describedby="errors.message ? 'contact-message-error' : undefined"
            class="mt-1.5 min-h-[100px] w-full rounded-xl border bg-slate-50/60 px-4 py-2.5 text-sm text-slate-900 placeholder-slate-400 transition-colors focus:bg-white focus:ring-2 focus:ring-sky-500 focus:outline-none dark:border-slate-800 dark:bg-slate-950/50 dark:text-white dark:placeholder-slate-500 dark:focus:bg-slate-900 dark:focus:ring-sky-400"
            :class="
              errors.message
                ? 'border-rose-400 dark:border-rose-500'
                : 'border-slate-200 dark:border-slate-800'
            "
            placeholder="Tell me about your technical project, research question, or collaboration..."
          />
          <p
            v-if="errors.message"
            id="contact-message-error"
            class="mt-1 text-xs text-rose-500"
            role="alert"
          >
            {{ errors.message }}
          </p>
        </div>
      </div>

      <!-- Optional HCaptcha -->
      <div v-if="HCAPTCHA_SITEKEY" class="mt-4 flex flex-col items-center">
        <VueHcaptcha
          ref="hCaptchaComponent"
          :key="captchaTheme"
          :sitekey="HCAPTCHA_SITEKEY"
          class="h-captcha flex justify-center"
          :data-theme="captchaTheme"
          @verify="onVerify"
          @expired="onExpire"
        />
        <p v-if="errors.captcha" class="mt-1 text-xs text-rose-500" role="alert">
          {{ errors.captcha }}
        </p>
      </div>

      <SendButtonComponent ref="btn" />
    </div>

    <div class="mt-6 border-t border-slate-200/70 pt-4 dark:border-slate-800/80">
      <p class="text-center text-xs text-slate-500 dark:text-slate-400">
        Direct email response typically within 24-48 hours.
      </p>
    </div>
  </form>
</template>
