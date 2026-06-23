<script setup></script>

<template>
  <section class="flex min-h-dvh flex-col items-center justify-start gap-4 sm:justify-center">
    <h2
      class="mb-12 text-center text-4xl font-bold text-slate-900 dark:text-white"
      v-motion-fade-in
    >
      About me
    </h2>
    <div class="grid w-full grid-cols-1 items-center gap-8 md:grid-cols-3">
      <div
        class="flex h-full items-center justify-center md:col-span-1"
        v-motion-slide-left
        :delay="100"
      >
        <img
          src="../components/icons/my_profile.jpeg"
          alt="photo profile"
          class="h-60 w-60 rounded-full border-4 border-sky-500 bg-white object-cover shadow-xl dark:border-sky-400 dark:bg-slate-800"
        />
      </div>
      <div
        class="flex flex-col gap-y-3 px-3 text-justify text-slate-600 md:col-span-2 md:mr-20 dark:text-slate-300"
        v-motion-slide-right
        :delay="200"
      >
        <p>
          Hello! I'm a final-year Computer Science student at USI. My journey in tech started with a
          curiosity for how things work, and it's evolved into a passion for developing solutions
          that are both smart and easy to use.
        </p>
        <p>
          As a developer, I enjoy the full spectrum of development, from designing intuitive user
          interfaces with
          <strong class="text-slate-900 dark:text-white">Vue.js and Tailwind</strong> (like this
          site!) to engineering robust back-end systems with Node.js.
        </p>
        <p>
          I'm currently looking for my first professional role where I can contribute my skills,
          learn from experienced mentors, and help build amazing products.
        </p>
      </div>
    </div>
  </section>
</template>
