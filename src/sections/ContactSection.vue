<script setup>
import { computed } from 'vue'
import { useClipboard } from '@vueuse/core'
import { ArrowUpRight, Check, Copy } from '@lucide/vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import ContactCard from '@/components/contact/ContactCard.vue'
import ContactForm from '@/components/contact/ContactForm.vue'
import { contactMethods, profileLinks } from '@/data/socials.js'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.contact)

// Email gets its own prominent block; the other channels are listed as cards.
const methods = computed(() =>
  contactMethods
    .filter((method) => method.id !== 'email')
    .map((method) => ({
      ...method,
      title: method.titleKey ? t.value.methods[method.titleKey] : method.title,
      value: method.valueKey ? t.value.methods[method.valueKey] : method.value,
      description: t.value.methods[method.descriptionKey],
    })),
)

const { copy, copied, isSupported: canCopy } = useClipboard({ copiedDuring: 2000 })
</script>

<template>
  <section class="py-24 sm:py-32" aria-labelledby="contact-title">
    <SectionHeader
      heading-id="contact-title"
      :index="4"
      :eyebrow="t.eyebrow"
      :title="`${t.sectionTitlePrefix} ${t.sectionTitleHighlight}`"
      :subtitle="t.sectionSubtitle"
    >
      {{ t.sectionTitlePrefix }}
      <span class="text-gradient">{{ t.sectionTitleHighlight }}</span>
    </SectionHeader>

    <div class="grid grid-cols-1 items-start gap-6 lg:grid-cols-12 lg:gap-8">
      <div class="flex flex-col gap-4 lg:col-span-5">
        <!-- Direct email -->
        <div v-reveal:left class="surface-card p-6 sm:p-7">
          <p class="mb-3 eyebrow text-2xs">{{ t.directTitle }}</p>
          <a
            :href="`mailto:${profileLinks.email}`"
            class="group inline-block rounded-md text-lg font-semibold tracking-tight break-all text-slate-900 focus-ring dark:text-mist-100"
          >
            {{ profileLinks.email }}
            <ArrowUpRight
              class="inline h-4 w-4 align-baseline text-brand-600 opacity-0 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100 dark:text-brand-300"
              aria-hidden="true"
            />
          </a>
          <div class="mt-3 flex items-center justify-between gap-3">
            <p class="text-sm text-slate-500 dark:text-mist-400">{{ t.footerNote }}</p>
            <button
              v-if="canCopy"
              type="button"
              class="btn-secondary h-9 shrink-0 px-3 text-xs"
              :aria-label="t.copyEmailAria"
              @click="copy(profileLinks.email)"
            >
              <Check v-if="copied" class="h-3.5 w-3.5 text-emerald-500" aria-hidden="true" />
              <Copy v-else class="h-3.5 w-3.5" aria-hidden="true" />
              <span aria-live="polite">{{ copied ? t.emailCopied : t.copyEmail }}</span>
            </button>
          </div>
        </div>

        <ul class="flex flex-col gap-3">
          <li v-for="(method, index) in methods" :key="method.id" v-reveal:left="(index + 1) * 90">
            <ContactCard :method="method" :new-tab-label="languageStore.t.a11y.opensInNewTab" />
          </li>
        </ul>
      </div>

      <div v-reveal:right="150" class="lg:col-span-7">
        <ContactForm />
      </div>
    </div>
  </section>
</template>
