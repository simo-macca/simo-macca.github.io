<script setup>
import { computed, ref } from 'vue'
import SendButtonComponent from '@/components/SendButtonComponent.vue'
import VueHcaptcha from '@hcaptcha/vue3-hcaptcha'
import { useThemeStore } from '@/stores/ThemeStore.js'

const WEB3FORMS_ACCESS_KEY = import.meta.env.VITE_WEB3FORMS_KEY
const HCAPTCHA_SITEKEY = import.meta.env.VITE_HCAPTCHA_SITEKEY
const name = ref('')
const email = ref('')
const message = ref('')
const hCaptchaToken = ref(null)
const hCaptchaMessage = ref(false)
const btn = ref()
const theme = useThemeStore()

const captchaTheme = computed(() => (theme.isDark ? 'dark' : 'light'))

/* captcha handlers */
const onVerify = (token) => {
  hCaptchaToken.value = token
}

const submitForm = async () => {
  if (!hCaptchaToken.value) {
    hCaptchaMessage.value = true
    throw new Error('Please complete the captcha')
  }
  hCaptchaMessage.value = false

  await btn.value.submit(async () => {
    const resp = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify({
        access_key: WEB3FORMS_ACCESS_KEY,
        name: name.value,
        email: email.value,
        message: message.value,
        subject: 'Someone wants to contact me',
        from_name: 'My portfolio website',
        'h-captcha-response': hCaptchaToken.value,
      }),
    })

    const result = await resp.json()

    if (!result.success) {
      throw new Error(result.message || 'Submission failed')
    }
  })

  name.value = ''
  email.value = ''
  message.value = ''
  hCaptchaToken.value = null
}
</script>

<template>
  <form
    @submit.prevent="submitForm"
    class="rounded-lg bg-white placeholder-sky-700 inset-shadow-sm inset-shadow-sky-200 sm:p-8 md:col-span-3 dark:bg-slate-800 dark:placeholder-sky-200 dark:inset-shadow-sky-900"
  >
    <h2 class="mb-8 text-2xl font-semibold text-slate-900 dark:text-white">Send me a message</h2>
    <div class="space-y-5">
      <div>
        <label for="name" class="block text-sm font-medium text-slate-600 dark:text-slate-300"
          >Your name</label
        >
        <input
          v-model="name"
          type="text"
          id="name"
          name="name"
          value=""
          onchange="this.setAttribute('value', this.value);"
          class="mt-1 w-full rounded-lg border border-transparent border-b-slate-500 bg-transparent px-4 py-2 text-slate-900 placeholder-sky-700/75 transition-colors focus:border-sky-600 focus:outline-none dark:border-b-slate-400 dark:text-white dark:placeholder-sky-200/75 dark:focus:border-sky-400"
          placeholder="Mario Rossi"
          autocomplete="name"
        />
      </div>
      <div>
        <label for="email" class="block text-sm font-medium text-slate-600 dark:text-slate-300"
          >Email address</label
        >
        <input
          v-model="email"
          type="email"
          id="email"
          name="email"
          class="mt-1 w-full rounded-lg border border-transparent border-b-slate-500 bg-transparent px-4 py-2 text-slate-900 placeholder-sky-700/75 transition-colors focus:border-sky-600 focus:outline-none dark:border-b-slate-400 dark:text-white dark:placeholder-sky-200/75 dark:focus:border-sky-400"
          placeholder="email@example.com"
          autocomplete="email"
        />
      </div>
      <div>
        <label for="message" class="block text-sm font-medium text-slate-600 dark:text-slate-300"
          >Your message</label
        >
        <textarea
          v-model="message"
          id="message"
          name="message"
          rows="5"
          class="mt-1 max-h-50 min-h-20 w-full rounded-lg border border-transparent border-b-slate-500 bg-transparent px-4 py-2 text-slate-900 placeholder-sky-700/75 transition-colors focus:border-sky-600 focus:outline-none dark:border-b-slate-400 dark:text-white dark:placeholder-sky-200/75 dark:focus:border-sky-400"
          placeholder="Tell me about your project or opportunity..."
        />
      </div>
    </div>

    <VueHcaptcha
      :key="captchaTheme"
      :sitekey="HCAPTCHA_SITEKEY"
      class="h-captcha mt-4 flex justify-center"
      :data-theme="captchaTheme"
      @verify="onVerify"
    />

    <div v-if="hCaptchaMessage" class="mt-2 w-full text-center text-red-500">
      Please complete the captcha
    </div>

    <SendButtonComponent ref="btn" />

    <div class="mt-6 border-t border-slate-200 pt-6 dark:border-slate-700">
      <p class="text-center text-sm text-slate-600 dark:text-slate-300">
        I typically respond within 24-48 hours
      </p>
    </div>
  </form>
</template>
