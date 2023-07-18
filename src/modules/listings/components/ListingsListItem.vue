<script lang="ts" setup>
  import DeleteListingMutation from '@/graphql/DeleteListingMutation'
  import useDarkMode from '@/composables/useDarkMode'
  import useNotification from '@/composables/useNotification'
  import useGraphQL from '@/composables/useGraphQL'

  const props = defineProps<{ listing: object }>()

  const { darkMode } = useDarkMode()
  const { setNotification, toggleNotification } = useNotification()

  const { useMutationComposable } = useGraphQL()
  const { mutate: deleteListing } = useMutationComposable(DeleteListingMutation)

  const removeListing = () => {
    const sure = window.confirm("Are you sure you want to delete it?")

    if (sure) {
      setNotification("Listing is to be deleted")
      return deleteListing({ id: props.listing.id })
    }
  }
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
            <span>${{ 10000/100 }}/day</span> · <span>Rating: 5/5</span>
          </small>

        </p>
      </div>
    </article>

    <div class="mr-0.5">
      <button @click="removeListing"
        class="text-xs tracking-wider border-transparent font-bold py-2 px-3 rounded shadow float-right"
        :class="{ 
          'text-cyan-800 bg-neutral-100 hover:bg-neutral-200': darkMode, 
          'text-blue-500 bg-slate-100 hover:bg-slate-200': !darkMode 
        }"
      >
        Remove
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