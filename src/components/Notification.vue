<template>
  <div v-if="notification.active"
    class="notification flex justify-between p-2 mb-7"
    :class="{ 'bg-blackish': darkMode, 'bg-whitesmoke': !darkMode }"  
  >

    <p 
      class="ml-3 text-sm tracking-wide" 
      :class="{ 'text-teal-400': darkMode, 'text-blue-600': !darkMode }"  
      v-text="notification.message"
    />

    <button class="x" @click="toggleNotification" />

  </div>
</template>

<script lang="ts" setup>
  import useDarkMode from '../composables/useDarkMode';

  type Notification = { message: string; active: boolean }

  interface Props {
    notification: Notification
    toggleNotification: Function
  }

  defineProps<Props>()

  const { darkMode } = useDarkMode()
</script>

<style>

.notification { animation: fadeIn 1.5s; }

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}

/* CSS to draw a X */

.x {
  background-color: rgba(10, 10, 10, 0.3);
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  height: 20px;
  width: 20px;
  outline: none;
  position: relative;
}

.x::before, .x::after {
  background-color: white;
  content: "";
  display: block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  transform-origin: center center;
}

.x::before {
  height: 2px;
  width: 50%;
}

.x::after {
  height: 50%;
  width: 2px;
}

.x:hover {
  background-color: rgba(10, 10, 10, 0.6);
}

</style>