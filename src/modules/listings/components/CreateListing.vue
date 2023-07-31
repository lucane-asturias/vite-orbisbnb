<script lang="ts" setup>
  import { computed, reactive } from 'vue'
  import { Money3Component } from 'v-money3'
  import { useCreateListing } from '../composables/useCreateListing'
  
  const props = defineProps<{ 
    toggleCreationMode: Function,
    darkMode: boolean
  }>()

  const { 
    creation_in_submission, creation_show_alert,
    creation_alert_color, creation_alert_msg,

    hiddenSelectRef, localImage, cloudinaryImageUrl,
    fileImage, fileError, fileErrorText,
    priceAmount, priceError, priceErrorText,

    onCreateListing, onSelectImage,
    onSelectedImage, isPriceZero
  } = useCreateListing()

  const defaultUserData = reactive({ baths: 1, guests: 1, beds: 1, rating: 1 })
  const createListingSchema = reactive({
    city: 'required|min:3|max:20|alpha_spaces',
    address: 'required|min:5|max:80',
    description: 'required|min:10|max:80|alpha_spaces',
    baths: 'required|min_value:1|max_value:5',
    guests: 'required|min_value:1|max_value:30',
    beds: 'required|min_value:1|max_value:30',
    // price: 'required|min_value:100|max_value:9999999999', // Couldn't work with Money3
    rating: 'required|excluded:6',
  })
  
  const moneyConfig = computed(() => ({
    decimal: ",",
    thousands: ".",
    prefix: "$ ",
    suffix: "",
    precision: 2,
    masked: false /* doesn't work with directive */,
  }))
</script>

<template>
  <div class="w-full max-w-lg mx-auto container p-2 mb-5">
    <div class="text-white text-center font-bold p-5 mb-4" v-if="creation_show_alert" :class="creation_alert_color">
    {{ creation_alert_msg }}              
    </div>
    <vee-form :validation-schema="createListingSchema" @submit="onCreateListing" :initial-values="defaultUserData">
      <div class="flex flex-wrap -mx-3 mb-6">
        <!-- City -->
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="grid-city"
            class="block uppercase tracking-wide text-xs font-bold mb-2" 
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            City
          </label>
          <vee-field type="text" id="grid-city" name="city" placeholder="Tokyo"
            class="appearance-none inline-block md:block w-full text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            :class="{ 'bg-darkgreyish hover:bg-lightgreyish': darkMode, 'bg-gray-200 hover:bg-gray-300': !darkMode }"
          />
          <!-- will generate span tag if there is error -->
          <ErrorMessage class="text-red-600 text-xs italic" name="city" />
        </div>
        <!-- Address -->
        <div class="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label for="grid-address"
            class="block uppercase tracking-wide text-xs font-bold mb-2"
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Address
          </label>
          <vee-field type="text" id="grid-address" name="address" placeholder="15-13 Nihonbashi Kabutocho Chuo-ku Tokyo Japan"
            class="appearance-none inline-block md:block w-full text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            :class="{ 'bg-darkgreyish hover:bg-lightgreyish': darkMode, 'bg-gray-200 hover:bg-gray-300': !darkMode }"
          />
          <ErrorMessage class="text-red-600 text-xs italic" name="address" />
        </div>
        <!-- Description -->
        <div class="w-full md:w-1/1 px-3">
          <label for="grid-description"
            class="block uppercase tracking-wide md:mt-4 text-xs font-bold mb-2"
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Description
          </label>
          <vee-field type="text" id="grid-description" name="description" placeholder="Description of the city"
            class="appearance-none block w-full text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{ 'bg-darkgreyish hover:bg-lightgreyish': darkMode, 'bg-gray-200 hover:bg-gray-300': !darkMode }"
          />
          <ErrorMessage class="text-red-600 text-xs italic" name="description" />
        </div>
      </div>
      
      <div class="flex flex-wrap -mx-3 mb-2">
        
        <!-- Quantity of guests -->
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label for="grid-guests"
            class="block uppercase tracking-wide text-xs font-bold mb-2"
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Quantity of guests
          </label>
          <vee-field type="number" id="grid-guests" name="guests"
            class="appearance-none block w-full text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            :class="{ 'bg-darkgreyish hover:bg-lightgreyish': darkMode, 'bg-gray-200 hover:bg-gray-300': !darkMode }"
          />
          <ErrorMessage class="text-red-600 text-xs italic" name="guests" />
        </div>
        <!-- Quantity of beds -->
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label for="grid-beds" 
            class="block uppercase tracking-wide text-xs font-bold mb-2"
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Quantity of beds
          </label>
          <vee-field type="number" id="grid-beds" name="beds"
            class="appearance-none block w-full text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" 
            :class="{ 'bg-darkgreyish hover:bg-lightgreyish': darkMode, 'bg-gray-200 hover:bg-gray-300': !darkMode }"
          />
          <ErrorMessage class="text-red-600 text-xs italic" name="beds" />
        </div>
        <!-- Quantity of baths -->
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label for="grid-baths" 
            class="block uppercase tracking-wide text-xs font-bold mb-2"
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Quantity of baths
          </label>
          <vee-field type="number" id="grid-baths" name="baths"
            class="appearance-none block w-full text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{ 'bg-darkgreyish hover:bg-lightgreyish': darkMode, 'bg-gray-200 hover:bg-gray-300': !darkMode }"
          />
          <ErrorMessage class="text-red-600 text-xs italic" name="baths" />
        </div>
      </div>

      <div class="flex flex-wrap -mx-3 mb-2">
        <!-- Price -->
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label for="grid-price"
            class="block uppercase tracking-wide text-xs font-bold mb-2"
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Price
          </label>

          <Money3Component @input="isPriceZero"
            v-model.number="priceAmount" 
            v-bind="moneyConfig"
            id="grid-price" 
            name="price" 
            class="appearance-none block w-full text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{ 'bg-darkgreyish hover:bg-lightgreyish': darkMode, 'bg-gray-200 hover:bg-gray-300': !darkMode }"
          />

          <p v-if="priceError" class="text-red-600 text-xs italic p-1.5" v-text="priceErrorText" />
        </div>
        <!-- Image -->
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">

          <label for="file"
            class="block uppercase tracking-wide text-xs font-bold mb-2"  
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Image       
          </label>

          <button @click.prevent="onSelectImage"
            class="w-full text-xs tracking-widest border border-gray-200 rounded font-bold py-4 px-4 rounded shadow"
            :class="{ 
              'text-marineblue bg-deepblue hover:bg-lightdeepblue': darkMode, 
              'text-blue-500 bg-slate-100 hover:bg-slate-200': !darkMode 
            }"
          >
              {{ fileImage ? fileImage.name : 'Select' }}
              <!-- <i class="fa fa-upload"></i> -->
          </button>

          <!-- Image selection simulator -->
          <input type="file" id="file" name="file" v-show="false" ref="hiddenSelectRef"
            accept="image/png, image/jpeg" @change="onSelectedImage($event)" />
          <p v-if="fileError" class="text-red-600 text-xs italic p-1.5" v-text="fileErrorText" />
        </div>
        <!-- Rating -->
        <div class="w-full md:w-1/3 px-3 mb-6 md:mb-0">
          <label for="grid-numOfBeds"
            class="block uppercase tracking-wide text-xs font-bold mb-2"
            :class="{ 'text-gray-200': darkMode, 'text-gray-700': !darkMode }">
            Rating
          </label>
          <vee-field as="select" id="grid-numOfBeds" name="rating" placeholder="1 out a 5"
            class="cursor-pointer appearance-none block w-full text-gray-500 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            :class="{ 'bg-darkgreyish hover:bg-lightgreyish': darkMode, 'bg-gray-200 hover:bg-gray-300': !darkMode }"
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
          </vee-field>
          <ErrorMessage class="text-red-600 text-xs italic" name="rating" />
        </div>

      </div>

      <button type="submit" :disabled="creation_in_submission"
        class="w-full text-sm text-blue-100 bg-blue-500 hover:bg-blue-600 font-semibold tracking-widest uppercase border-transparent font-bold mt-4 py-4 px-4 rounded shadow">
        Submit
      </button>
      <button 
        class="w-full text-sm bg-red-600 hover:bg-red-700 text-slate-200 font-semibold tracking-widest uppercase mt-4 py-1.5 px-4 rounded shadow" 
        @click.prevent="toggleCreationMode">
        Close
      </button>

    </vee-form>

    <img v-if="localImage && !cloudinaryImageUrl" :src="localImage" alt="listing-image" 
      class="fixed w-48 right-5 bottom-6 md:right-12 md:bottom-6 img-thumbnail" 
    />
    <img v-if="cloudinaryImageUrl" :src="cloudinaryImageUrl" alt="listing-image" 
      class="fixed w-48 right-5 bottom-6 md:right-12 md:bottom-6 img-thumbnail" 
    />

  </div>
</template>

<style scoped>
/*img-thumbnail {
  width: 200px;
  position: fixed;
  bottom: 30px;
  right: 25px;
}*/
</style>