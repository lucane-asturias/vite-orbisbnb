<script setup>
  import { onMounted } from 'vue'

  import ListingsListItem from './ListingsListItem.vue'
  import Notification from './Notification.vue'

  import useDarkMode from '../hooks/useDarkMode'
  import useNotification from '../hooks/useNotification'

  const { darkMode } = useDarkMode()
  const { notification, setNotification, toggleNotification } = useNotification()

  onMounted(() => {
    setNotification("Welcome to NewlSineBnB!")
  })

</script>

<template>
  <div id="listings">
    <Notification :notification="notification" :toggleNotification="toggleNotification" />
    <!-- <div v-for="listing in listings" :key="listing.id">
      <ListingsListItem :listing="listing" :refetchListings="refetchListings" />
    </div> -->
    <ListingsListItem />
  </div>
</template>
