<template>
  <div v-if="notification.active" 
    class="flex justify-between bg-whitesmoke p-2 mb-4"
    :class="{ 'is-primary': darkMode, 'is-info': !darkMode }">

    <p class="ml-3 text-sm text-blue-600 tracking-wide" v-text="notification.message" />

    <button class="teste" @click="toggleNotification" />

  </div>
</template>

<script lang="ts" setup>
  import useDarkMode from '../hooks/useDarkMode';

  type Notification = { message: string; active: boolean }

  interface Props {
    notification: Notification
    toggleNotification: Function
  }

  defineProps<Props>()

  const { darkMode } = useDarkMode()
</script>

<style>

/* CSS to draw a X */

.teste {
  background-color: rgba(10, 10, 10, 0.3);
  border-radius: 50%;
  cursor: pointer;
  pointer-events: auto;
  height: 20px;
  width: 20px;
  outline: none;
  position: relative;
}

.teste::before, .teste::after {
  background-color: white;
  content: "";
  display: block;
  left: 50%;
  position: absolute;
  top: 50%;
  transform: translateX(-50%) translateY(-50%) rotate(45deg);
  transform-origin: center center;
}

.teste::before {
  height: 2px;
  width: 50%;
}

.teste::after {
  height: 50%;
  width: 2px;
}

.teste:hover {
  background-color: rgba(10, 10, 10, 0.6);
}

</style>