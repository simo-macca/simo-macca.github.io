<script setup>
import { computed, ref, reactive } from 'vue'
import SendButtonComponent from '@/components/SendButtonComponent.vue'
import FormField from '@/components/contact/FormField.vue'
import FormAlert from '@/components/contact/FormAlert.vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import { useThemeStore } from '@/stores/ThemeStore.js'

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
    class="flex flex-col justify-between rounded-2xl border border-slate-200/80 bg-white/90 p-6 shadow-xs backdrop-blur-sm sm:p-8 dark:border-white/[0.08] dark:bg-[#111827]/80"
    aria-label="Contact form"
  >
    <div>
      <h2 class="mb-2 text-2xl font-bold tracking-tight text-slate-900 dark:text-[#F3F4F6]">
        Send Me a Message
      </h2>
      <p class="mb-6 text-sm text-slate-600 dark:text-[#9CA3AF]">
        Have a technical inquiry, distributed systems discussion, or collaboration proposal? Let's
        connect.
      </p>

      <FormAlert :message="errors.general" variant="error" />

      <div class="space-y-4">
        <FormField
          id="contact-name"
          label="Your Name"
          v-model="form.name"
          :error="errors.name"
          @input="errors.name = ''"
          placeholder="Ada Lovelace"
          autocomplete="name"
        />

        <FormField
          id="contact-email"
          label="Email Address"
          type="email"
          v-model="form.email"
          :error="errors.email"
          @input="errors.email = ''"
          placeholder="ada@example.com"
          autocomplete="email"
        />

        <FormField
          id="contact-message"
          label="Your Message"
          type="textarea"
          v-model="form.message"
          :error="errors.message"
          @input="errors.message = ''"
          rows="4"
          placeholder="Tell me about your technical project, research problem, or collaboration..."
        />
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

    <div class="mt-6 border-t border-slate-200/80 pt-4 dark:border-white/[0.08]">
      <p class="text-center text-xs text-slate-500 dark:text-[#9CA3AF]">
        Direct response typically within 24-48 hours.
      </p>
    </div>
  </form>
</template>
