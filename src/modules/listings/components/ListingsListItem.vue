<script lang="ts" setup>
  import { useListingsListItem } from '../composables/useListingsListItem'

  const props = defineProps<{ listing: object }>()

  const { darkMode, removeListing, formatPrice } = useListingsListItem()
</script>

<template>
  <div class="flex mb-5">

    <figure class="mr-4">
      <p class="w-32 hidden md:block">
        <img class="w-full h-auto rounded" :src="listing.image" />
      </p>
    </figure>

    <article class="flex-initial shrink grow">
      <div class="listing-content">
        <p :class="{ 'text-white': darkMode }">
          <strong :class="{ 'text-white': darkMode }" v-text="listing.title" />

          <small 
            class="pl-1" 
            :class="{ 'text-teal-400': darkMode, 'text-blue-500': !darkMode }" 
            v-text="listing.address" 
          />

          <br><p class="inline-block pr-4" v-text="listing.description" /><br>

          <small 
            class="font-bold" 
            :class="{ 'text-teal-500': darkMode, 'text-blue-500': !darkMode }"
          >
            <span>{{ formatPrice(listing.price) }}/day</span> · <span>Rating: 5/5</span>
          </small>

        </p>
      </div>
    </article>

    <div class="mr-0.5">
      <button @click="removeListing(listing.id)"
        class="text-xs sm:text-sm tracking-wider border-transparent font-bold py-2 px-3 rounded shadow float-right"
        :class="{ 
          'text-red-500 bg-darkgreyish hover:bg-lightgreyish': darkMode, 
          'text-red-500 bg-red-100 hover:bg-red-200': !darkMode 
        }"
      >
        {{ $t('listings_list_item.remove') }}
      </button>
    </div>

  </div>
</template>

<style>
/*(@media screen and (max-width: 768px) {
  .hidden-mobile {
    display: none !important;
  }
}*/
</style>