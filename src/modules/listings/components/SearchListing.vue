<template>
  <div class="searchbar">
    <input type="text"
      class="appearance-none inline-block md:block w-36 md:w-40 text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:border-gray-500 ml-5 text-sm md:text-md font-semibold shadow float-right" 
      :class="{ 
        'bg-darkgreyish hover:bg-lightgreyish focus:bg-darkgreyish': darkMode, 
        'bg-gray-200 hover:bg-gray-300 focus:bg-white ': !darkMode 
      }"
      :placeholder="$t('search_listings.search')"
      v-model="searchListingTitleInput"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'
  import { refDebounced } from '@vueuse/core'
  import { useListingsStore } from '../store/listingsStore'

  defineProps<{ darkMode: boolean }>()

  const listingsStore = useListingsStore()
  const { searchListingTitle } = storeToRefs(listingsStore)

  const searchListingTitleInput = ref<string>('')
  const debounced = refDebounced(searchListingTitleInput, 1000)
  searchListingTitle.value = debounced
</script>

<style lang="css" scoped>
.searchbar {
  box-shadow: 0px 5px 10px rgba(0, 0, 0, .2);
}
</style>