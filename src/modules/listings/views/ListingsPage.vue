<script lang="ts" setup>
  import { computed, onMounted, ref } from 'vue'
  import type { Listing as ListingType } from '../interfaces/ListingType'
  import ListingsLayout from '../layout/ListingsLayout.vue'
  import { useListingsStore } from '../store/listingsStore'

  import { useListingsPage } from '../composables/useListingsPage'

  import Notification from '@/components/Notification.vue'
  import LoadProgress from '@/components/LoadProgress.vue'
  import CreateListing from '../components/CreateListing.vue'
  import ListingsList from '../components/ListingsList.vue'
  import ListingsListItem from '../components/ListingsListItem.vue'

  const { 
    darkMode, toggleDarkMode,
    creationMode, toggleCreationMode,
    notification, setNotification, toggleNotification,
    useQueryComposable, useMutationComposable,
    result, loading, error,
    removeAllListings
  } = useListingsPage()

  const listingsStore = useListingsStore()

  // Retrieve the query result from GraphQL data
  const listings = computed<ListingType[]>(() => { 
    if (!result.value?.listings) return []
    listingsStore.setListings(result.value.listings)
    return result.value.listings
  })

  onMounted(() => setNotification("Welcome to OrbisBnB!"))
</script>

<template> 
  <main>
    <ListingsLayout> 

      <div v-if="loading"><LoadProgress /></div>

      <Notification 
        :notification="notification" 
        :toggleNotification="toggleNotification" 
      />

      <Transition name="fade">
        <section v-if="creationMode">
          <CreateListing :darkMode="darkMode" :toggleCreationMode="toggleCreationMode" />
        </section>
      </Transition>

      <section v-if="listings && listings.length">
        <ListingsList :listings="listings" />
      </section>
        
      <div v-else-if="listings && !listings.length && !loading && !creationMode" :class="{ 'text-slate-200': darkMode, 'text-black': !darkMode }">
        <p>There's any listings left! Create 
          <span class="cursor-pointer underline font-bold text-gray-700 hover:text-gray-400 hover:opacity-60"
            @click="toggleCreationMode">
            one
          </span>
        </p>
      </div>

      <div v-else-if="error">
        <p :class="{ 'text-teal-400': darkMode, 'text-blue-500': !darkMode }" >
          Something went wrong. We couldn't query for listings - try again later!
        </p>
      </div>

      <button v-if="listings.length"
        class="text-sm font-semibold mt-2 py-1.5 px-2.5 rounded shadow" 
        :class="darkMode ? 'bg-red-600 hover:bg-red-500 text-slate-100' : 'bg-red-600 hover:bg-red-500 text-slate-200'"
        @click="removeAllListings(0)"
      >
       Delete all 
      </button>
      
      <button v-if="!creationMode"
        class="fixed z-90 pb-1.5 bottom-10 right-8 w-14 h-14 rounded-full drop-shadow-lg 
        flex justify-center items-center text-white text-4xl bg-blue-600 hover:bg-blue-700 hover:drop-shadow-2xl"
        @click="toggleCreationMode"
      >
       &plus;
      </button>

    </ListingsLayout>
  </main>
</template>

<style>
.fade-leave-active,
.fade-enter-active {
  transition: all 0.5s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

/*
.fade-in { animation: fadeIn .8s; }

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}*/
</style>