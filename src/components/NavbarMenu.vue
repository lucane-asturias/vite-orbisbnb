<template>
  <nav class="border-gray-200 dark:bg-gray-900">
    <menu class="flex justify-between items-center mx-auto p-4 mx-5">
      <span 
        class="self-center text-md font-semibold whitespace-nowrap dark:text-white">OrbisBnB</span>

      <div class="flex items-center">
        <button 
          class="ml-5 text-sm font-semibold py-2 px-3 rounded shadow float-right" 
          :class="{ 
           'text-gray-100 bg-slate-800 hover:bg-gray-900': darkMode,
           'text-gray-900 bg-slate-200 hover:bg-gray-300': !darkMode
          }"
        >
          Search
        </button>
        <button 
          class="ml-5 text-sm font-semibold py-2 px-3 rounded shadow float-right" 
          :class="{ 
           'text-gray-100 bg-slate-800 hover:bg-gray-900': darkMode,
           'text-gray-900 bg-slate-200 hover:bg-gray-300': !darkMode
          }"
          @click="toggleDarkMode"
        >
         {{ darkModeButtonText }}
        </button>
      </div>

    </menu>
  </nav>
</template>

<script setup>
  import { computed } from 'vue'
  import useDarkMode from '../composables/useDarkMode'

  const { darkMode, toggleDarkMode } = useDarkMode()

  const darkModeButtonText = computed(() => darkMode.value ? 'Light Mode' : 'Dark Mode')
</script>