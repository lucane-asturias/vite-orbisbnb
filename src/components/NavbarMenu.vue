<template>
  <nav class="border-gray-200 dark:bg-gray-900">
    <menu class="flex justify-between items-center mx-auto p-4 mx-5 lg:mx-7">

      <router-link to="/">
        <span class="self-center text-md md:text-xl font-semibold whitespace-nowrap dark:text-white">
          &#9992; OrbisBnB &#9992;
        </span>
      </router-link>

      <div class="flex items-center">
        <SearchListing :darkMode="darkMode" />
        <button 
          class="ml-5 text-md font-semibold py-1 sm:py-3 px-3 rounded shadow float-right" 
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
  import SearchListing from '@/modules/listings/components/SearchListing.vue'
  import { useListingsStore } from '@/modules/listings/store/listingsStore'
  import useDarkMode from '../composables/useDarkMode'

  const listingsStore = useListingsStore()
  const { darkMode, toggleDarkMode } = useDarkMode()

  const darkModeButtonText = computed(() => darkMode.value ? 'Light Mode' : 'Dark Mode')
</script>