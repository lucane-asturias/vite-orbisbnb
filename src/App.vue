<template>

  <!-- will be replaced and loaded with the correct component based on route records -->
  <router-view v-slot="{ Component }">
    <!-- will render whatever component is provided by the router view -->
    <component :is="Component"></component>
  </router-view>
  
</template>

<style>
html, body, #app {
  width: 100%;
  height: 100%;
}
</style>