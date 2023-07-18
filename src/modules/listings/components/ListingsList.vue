<script lang="ts" setup>
  import ListingsListItem from './ListingsListItem.vue'
  import useDarkMode from '@/composables/useDarkMode'

  const { darkMode } = useDarkMode()
  
  defineProps<{ listings: object }>()
</script>

<template>
  <div id="listings">

    <TransitionGroup name="list">

      <div v-for="listing in listings" :key="listing.id">
        <ListingsListItem :listing="listing" />
      </div>

    </TransitionGroup>

  </div>
</template>

<style>
.list-move, /* apply transition to moving elements */
.list-enter-active,
.list-leave-active {
  transition: all 0.5s ease;
}
.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>