<template>
  <div class="w-full max-w-lg mx-auto container p-2 mb-5">
    <form class="p-2" @submit.prevent="onCreateListing">
      <div class="flex flex-wrap -mx-3 mb-6">

        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="grid-city"
            class="block uppercase tracking-wide text-xs font-bold mb-2" 
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            City
          </label>
          <input class="appearance-none inline-block md:block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-city" type="text" placeholder="Tokyo">
          <p class="text-red-500 text-xs italic">Please fill out this field.</p>
        </div>

        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="grid-address"
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Address
          </label>
          <input class="appearance-none inline-block md:block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-address" type="text" placeholder="15-13 Nihonbashi Kabutocho Chuo-ku Tokyo Japan">
        </div>

        <div class="w-full md:w-1/1 px-3">
          <label for="grid-description"
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Description
          </label>
          <input class="appearance-none block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-description" type="text" placeholder="Description of the city">
        </div>
      </div>
      
      <div class="flex flex-wrap -mx-3 mb-2">
        
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label for="grid-numOfBeds" 
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Quantity of baths
          </label>
          <input class="appearance-none block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-numOfBeds" type="text">
        </div>        

        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label for="grid-numOfGuests"
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Quantity of guests
          </label>
          <input class="appearance-none block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-numOfGuests" type="number">
        </div>
          
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label for="grid-numOfBeds" 
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Quantity of beds
          </label>
          <input class="appearance-none block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-numOfBeds" type="text">
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-2">
        
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label for="grid-price"
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Price
          </label>
          <input class="appearance-none block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-price" type="number">
        </div>

        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label for="grid-numOfGuests"
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 rounded"  
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Image       
          </label>

          <button @click.prevent="onSelectImage"
            class="w-full text-xs tracking-wider border-transparent font-bold py-4 px-4 rounded shadow"
            :class="{ 
              'text-cyan-800 bg-neutral-100 hover:bg-neutral-200': darkMode, 
              'text-blue-500 bg-slate-100 hover:bg-slate-200': !darkMode 
            }"
          >
              Select
              <!-- <i class="fa fa-upload"></i> -->
          </button>

          <!-- Image selection simulator -->
          <input type="file" v-show="false" ref="imageSelector"
            accept="image/png, image/jpeg" @change="onSelectedImage($event)" />

          <!-- <input class="appearance-none block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-numOfGuests" type="number"> -->
        </div>

        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label for="grid-numOfBeds"
            class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Rating
          </label>
          <input class="appearance-none block w-full bg-gray-200 hover:bg-gray-300 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-numOfBeds" type="text">
        </div>

      </div>

      <button type="submit" 
        class="w-full text-sm font-semibold tracking-widest uppercase border-transparent font-bold mt-2.5 py-4 px-4 rounded shadow"
        :class="{ 
          'text-cyan-800 bg-neutral-100 hover:bg-neutral-200': darkMode, 
          'text-blue-100 bg-blue-500 hover:bg-blue-600': !darkMode 
        }"
      >
        Submit
      </button>
      <button 
        class="w-full text-sm font-semibold tracking-widest uppercase mt-2 py-1.5 px-4 rounded shadow" 
        :class="darkMode ? 'bg-red-600 hover:bg-red-700 text-slate-100' : 'bg-red-600 hover:bg-red-700 text-slate-200'"
        @click.prevent="toggleCreationMode"
      >
        Close
      </button>

    </form>
  </div>
</template>

<script lang="ts" setup>
  import { ref } from 'vue'

  const props = defineProps<{ 
    creationMode: boolean,
    toggleCreationMode: Function,
    darkMode: boolean
  }>()

  const imageSelector = ref<null | HTMLInputElement>(null)

  const onSelectImage = () => imageSelector.value.click()

  const onSelectedImage = (e) => {
    console.log('working', e)
  }

  const onCreateListing = (e) => {
    console.log(e.target.value)
  }

</script>