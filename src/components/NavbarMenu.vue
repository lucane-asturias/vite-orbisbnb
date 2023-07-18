<template>
  <nav class="bg-white border-gray-200 dark:bg-gray-900">
    <div class="flex justify-between items-center mx-auto p-4">
      <span class="self-center text-md font-semibold whitespace-nowrap dark:text-white">NewlineBnB</span>

      <div class="flex items-center">
        <button 
          class="ml-5 text-sm font-semibold py-2 px-3 rounded shadow float-right bg-slate-200 hover:bg-gray-300" 
          @click="toggleDarkMode"
        >
         {{ darkModeButtonText }}
        </button>
      </div>

    </div>
  </nav>
</template>

<script setup>
  import { computed } from 'vue'
  import useDarkMode from '../composables/useDarkMode'

  const { darkMode, toggleDarkMode } = useDarkMode()

  const darkModeButtonText = computed(() => darkMode.value ? 'Light Mode' : 'Dark Mode')
</script>