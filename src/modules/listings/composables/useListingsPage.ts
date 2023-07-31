import { ref } from 'vue'
import Swal from 'sweetalert2'
import useGraphQL from '@/composables/useGraphQL'
import useDarkMode from '@/composables/useDarkMode'
import useNotification from '@/composables/useNotification'
import { useListingsStore } from '../store/listingsStore'
import { destroyImage } from '../helpers/cloudinaryAPI'

import ListingsQuery from '@/graphql/ListingsQuery'
import DeleteAllListingsMutation from '@/graphql/DeleteAllListingsMutation'

const { darkMode, toggleDarkMode } = useDarkMode()
const { useQueryComposable, useMutationComposable } = useGraphQL()
const { notification, setNotification, toggleNotification } = useNotification()

const { mutate: deleteAllListings } = useMutationComposable(DeleteAllListingsMutation)

const creationMode = ref<boolean>(false)
const { result, loading, error } = useQueryComposable(ListingsQuery)

export const useListingsPage = () => {

  const toggleCreationMode = () => creationMode.value = !creationMode.value

  const removeAllListings = async (zero: number) => {
    const listingsStore = useListingsStore()

    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: "Once deleted, the listings cannot be restored",
      showDenyButton: true,
      confirmButtonText: 'Yes'
    })

    if (isConfirmed) {
      listingsStore.listings = undefined
      await deleteAllListings({ zero }) // Zeroing listings

      if (localStorage.getItem("tokens")) {
        const storageTokens = JSON.parse(localStorage.getItem("tokens"))

        for await (const tokens of storageTokens) {
          try {
            await destroyImage(tokens.deleteToken)
          } catch (error) {
            console.error('Time has expired!', error)
          }
        }
      }

      setNotification("All listings have been deleted!")
      Swal.fire('Deleted', '', 'success')
    }
  }

  return { 
    darkMode, toggleDarkMode, 
    creationMode, toggleCreationMode,
    notification, setNotification, toggleNotification,
    useQueryComposable, useMutationComposable,
    result, loading, error,
    removeAllListings
  }
}