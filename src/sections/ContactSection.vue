<script setup>
import { computed } from 'vue'
import SectionHeader from '@/components/common/SectionHeader.vue'
import ContactCard from '@/components/contact/ContactCard.vue'
import ContactForm from '@/components/contact/ContactForm.vue'
import { contactMethods } from '@/data/socials.js'
import { useLanguageStore } from '@/stores/language.js'

const languageStore = useLanguageStore()
const t = computed(() => languageStore.t.contact)

const methods = computed(() =>
  contactMethods.map((method) => ({
    ...method,
    title: method.titleKey ? t.value.methods[method.titleKey] : method.title,
    value: method.valueKey ? t.value.methods[method.valueKey] : method.value,
    description: t.value.methods[method.descriptionKey],
  })),
)
</script>

<template>
  <section class="py-20" aria-labelledby="contact-title">
    <SectionHeader
      heading-id="contact-title"
      :eyebrow="t.eyebrow"
      :title="t.sectionTitlePrefix"
      :subtitle="t.sectionSubtitle"
    >
      {{ t.sectionTitlePrefix }}
      <span class="text-gradient">{{ t.sectionTitleHighlight }}</span>
    </SectionHeader>

    <div class="mx-auto grid w-full max-w-5xl grid-cols-1 items-start gap-8 lg:grid-cols-2">
      <ul class="flex flex-col gap-4">
        <li
          v-for="(method, index) in methods"
          :key="method.id"
          v-motion-slide-left
          :delay="index * 100"
        >
          <ContactCard :method="method" :new-tab-label="languageStore.t.a11y.opensInNewTab" />
        </li>
      </ul>

      <div v-motion-slide-right :delay="150">
        <ContactForm />
      </div>
    </div>
  </section>
</template>
