<script setup>
  // import { useMutation } from '@vue/apollo-composable'

  // import DeleteListingMutation from '../graphql/DeleteListingMutation'
  import useDarkMode from '../hooks/useDarkMode'
  import useNotification from '../hooks/useNotification'

  // const props = defineProps(['refetchListings'])

  // const { mutate: deleteListing, onDone } = useMutation(DeleteListingMutation)
  const { darkMode } = useDarkMode()
  const { setNotification } = useNotification()

  // const removeListing = () => {
  //   setNotification("Listing is to be deleted")
  //   return deleteListing({ id: props.listing.id })
  // }
  // // when mutation is successful
  // onDone(() => {
  //   props.refetchListings()
  //   setNotification("Listing has been deleted")
  // })
</script>

<template>
  <article class="flex flex-start mb-5">
    <figure class="mr-4">
      <p class="w-32 hidden md:block">
        <img class="w-full h-auto rounded" src="https://res.cloudinary.com/tiny-house/image/upload/v1560641352/mock/Toronto/toronto-listing-1_exv0tf.jpg">
      </p>
    </figure>
    <div class="flex-initial shrink grow">
      <div class="listing-content">
        <article :class="{ 'text-white': darkMode }">
          <strong :class="{ 'text-white': darkMode }">
            Toronto
          </strong>
          <small class="pl-1" 
            :class="{ 'text-teal-400': darkMode, 'text-blue-500': !darkMode }">
            3210 Scotchmere Dr W, Toronto, ON, CA
          </small>
          <br>
          <p class="inline-block pr-4">
            Clean and fully furnished apartment. 5 min away from CN Tower
          </p>
          <br>
          <small class="font-bold"
            :class="{ 'text-teal-500': darkMode, 'text-blue-500': !darkMode }">
            <span>${{ 10000/100 }}/day</span> · <span>Rating: 5/5</span>
          </small>
        </article>
      </div>
    </div>
    <div class="mr-0.5">
      <button class="text-xs tracking-wider border-transparent font-bold 
        py-2 px-3 rounded shadow float-right"
        :class="{ 'text-slate-800 bg-neutral-100 hover:bg-neutral-200': darkMode, 'text-blue-600 bg-slate-100 hover:bg-slate-200': !darkMode }"
      >
        Remove
      </button>
    </div>
  </article>
</template>

<style>
/*(@media screen and (max-width: 768px) {
  .hidden-mobile {
    display: none !important;
  }
}*/
</style>