<script setup>
  import { computed } from 'vue'
  // import { useQuery, useResult } from '@vue/apollo-composable'
  import ListingsList from './modules/components/ListingsList.vue'

  // import ListingsQuery from './graphql/ListingsQuery'
  import useDarkMode from './modules/hooks/useDarkMode'
  import LoadProgress from './components/LoadProgress.vue'

  // const { result, loading, error, refetch: refetchListings } = useQuery(ListingsQuery)
  // get listings from GraphQL data
  // const listings = useResult(result)

  const { darkMode, toggleDarkMode } = useDarkMode()

  const darkModeButtonText = computed(() => {
    return darkMode.value ? 'Light Mode' : 'Dark Mode'
  })

</script>

<template>
  <div class="app" :class="{ 'bg-black': darkMode }">
    <div class="container my-6 lg:px-10 mx-auto py-6 px-4">

      <div v-if="false">
        <LoadProgress />
      </div>

      <!-- <div v-else-if="error">
        <p>Uh oh something went wrong. We couldn't query for listings - try again later!</p>
      </div> -->

      <!-- <div v-else-if="listings && listings.length">
        <ListingsList :listings="listings" :refetchListings="refetchListings" />
      </div> -->

        <ListingsList />
      <!-- <div v-else-if="listings && !listings.length">
        <p>There doesn't appear to be any listings left!</p>
      </div> -->
      <!-- bg-white hover:bg-gray-100 -->
      <button 
        class="text-sm font-semibold py-1.5 px-2.5 rounded shadow float-right" 
        :class="darkMode ? 'bg-white hover:bg-gray-200 text-slate-600' : 'bg-black hover:bg-gray-900 text-slate-300'"
        @click="toggleDarkMode"
      >
       {{ darkModeButtonText }}
      </button>
    </div>
  </div>
</template>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
}
</style>

<style scoped>
.app {
  width: 100%;
  height: 100%;
}

</style>