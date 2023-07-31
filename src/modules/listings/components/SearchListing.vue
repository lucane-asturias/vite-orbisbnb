<template>
  <div class="searchbar-container">
    <input type="text"
      class="appearance-none inline-block md:block w-full text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
      :class="{ 'bg-darkgreyish hover:bg-lightgreyish': darkMode, 'bg-gray-200 hover:bg-gray-300': !darkMode }"
      placeholder="Search listings..." 
      v-model="searchListing"
    />
  </div>
</template>

<script setup lang="ts">
  import { ref, computed } from 'vue'

  const debounceTimeout = ref()

  const searchListing = computed({
    get() {
      return debounce.value
    },
    set(searchListingValue: string) {

      if (debounceTimeout.value) clearTimeout(debounceTimeout.value)

      debounceTimeout.value = setTimeout(() => {
        searchPlacesByTerm(searchTermValue)
      }, 1000)
    }
  })
</script>

<style lang="css" scoped>
.searchbar-container {
  position: fixed;
  top: 30px;
  left: 30px;
  background-color: white;
  z-index: 999;
  box-shadow: 0px 5px 10px rgba(0, 0, 0, .2);
  width: 250px;
  border-radius: 5px !important;
  overflow: hidden;
  padding: 5px;
}
</style>