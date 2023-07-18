import ListingsQuery from '@/graphql/ListingsQuery'
import DeleteAllListingsMutation from '@/graphql/DeleteAllListingsMutation'

import useGraphQL from '@/composables/useGraphQL'
import useDarkMode from '@/composables/useDarkMode'
import useNotification from '@/composables/useNotification'

const { notification, setNotification, toggleNotification } = useNotification()
const { darkMode, toggleDarkMode } = useDarkMode()
const { useQueryComposable, useMutationComposable } = useGraphQL()

const { result, loading, error } = useQueryComposable(ListingsQuery)
const { mutate: deleteAllListings } = useMutationComposable(DeleteAllListingsMutation)

const useListingsPage = () => {

  const removeAllListings = (zero: number) => {
    setNotification("Listing is to be deleted")
    const sure: boolean = window.confirm("Are you sure you want to delete all?")
    if (sure) deleteAllListings({ zero }) // Zeroing the list
  }

  return { 
    darkMode, toggleDarkMode,
    notification, setNotification, toggleNotification,
    useQueryComposable, useMutationComposable,
    result, loading, error,
    removeAllListings
  }
}

export default useListingsPage