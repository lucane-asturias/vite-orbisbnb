import DeleteListingMutation from '@/graphql/DeleteListingMutation'
import useDarkMode from '@/composables/useDarkMode'
import useNotification from '@/composables/useNotification'
import useGraphQL from '@/composables/useGraphQL'
import { useListingsStore } from '../store/listingsStore'
import { destroyImage } from '../helpers/cloudinaryAPI'
import Swal from 'sweetalert2'

const { darkMode } = useDarkMode()
const { setNotification } = useNotification()

const { useMutationComposable } = useGraphQL()
const { mutate: deleteListing } = useMutationComposable(DeleteListingMutation)

export const useListingsListItem = () => {

  const removeListing = async (id) => {
    const listingsStore = useListingsStore()

    const { isConfirmed } = await Swal.fire({
      title: 'Are you sure?',
      text: "Once deleted, it cannot be restored",
      showDenyButton: true,
      confirmButtonText: 'Yes'
    })

    if (isConfirmed) {
      const isExpired = listingsStore.storageTimerById(id)

      if (isExpired) {
        Swal.fire('Sorry', '10 minutes has expired, not able to delete', '', 'error')
        return
      }

      const tokenObj = listingsStore.getStorageTokenById(id)
      const deleteToken = tokenObj.deleteToken

      const deletionResult = await destroyImage(deleteToken)
      await deleteListing({ id })
      listingsStore.removeStorageTokenObj(id)
      Swal.fire('The listing has been deleted', '', 'success')
    }
  }

  const formatPrice = (price) => {
    if (price <= 99) return `$${price.toFixed(2)}`

    const options = { minimumFractionDigits: 2, style: "currency", currency: "USD" }
    return new Intl.NumberFormat('en-US', options).format(price / 100)
  }

  return { darkMode, removeListing, formatPrice }
}