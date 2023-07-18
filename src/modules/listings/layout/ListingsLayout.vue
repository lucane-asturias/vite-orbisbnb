<template>
  <header class="basic-layout overflow-auto" :class="{ 'bg-black': darkMode }">

    <NavbarMenu />

    <div class="container py-10 lg:px-10 mx-auto py-6 px-4">
      <slot />
    </div>

  </header>
</template>

<script setup>
  import NavbarMenu from '@/components/NavbarMenu.vue'
  import useDarkMode from '@/composables/useDarkMode'

  const { darkMode } = useDarkMode()
</script>

<style scoped>
.basic-layout {
  width: 100vw;
  height: 100vh;
}
</style>