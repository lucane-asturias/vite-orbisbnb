import { i18n } from '@/includes/i18n'
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

const { locale } = i18n.global

export const useListingsListItem = () => {

  const removeListing = async (id) => {
    const listingsStore = useListingsStore()

    let translatedTitle
    let translatedText

    switch (locale.value) {
      case 'pt':
        translatedTitle = 'Tem certeza?'
        translatedText = 'Uma vez excluída, a mobília não poderá ser restaurada.'
        break;
      case 'es':
        translatedTitle = '¿Está seguro?'
        translatedText = 'Una vez borrado, el mueble no se puede restaurar.'
        break;
      case 'ja':
        translatedTitle = '本当にそれでいいんですか？'
        translatedText = '一度削除されたら、家具を復元することはできません。'
        break;
      default:
        translatedTitle = 'Are you sure?'
        translatedText = 'Once deleted, the furniture cannot be restored.'
    }

    const { isConfirmed } = await Swal.fire({
      title: translatedTitle,
      text: translatedText,
      showDenyButton: true,
      confirmButtonText: 'Yes'
    })

    let notification_msg

    if (isConfirmed) {
      const isExpired = listingsStore.storageTimerById(id)

      if (isExpired) {
        // TODO: translations
        Swal.fire('Sorry', '10 minutes has expired, not able to delete', '', 'error')
        return
      }

      const tokenObj = listingsStore.getStorageTokenById(id)
      const deleteToken = tokenObj.deleteToken

      const deletionResult = await destroyImage(deleteToken)
      await deleteListing({ id })
      listingsStore.removeStorageTokenObj(id)

      switch (locale.value) {
        case 'pt':
          notification_msg = 'Uma mobília foi deletada!'
          break;
        case 'es':
          notification_msg = '¡El mueble fue eliminado!'
          break;
        case 'ja':
          notification_msg = 'その家具は削除されました！'
          break;
        default:
          notification_msg = 'The listing has been deleted!'
        }

      Swal.fire(`${notification_msg}`, '', 'success')
    }
  }

  const formatPrice = (price) => {
    const options = { minimumFractionDigits: 2, style: "currency", currency: "USD" }
    return new Intl.NumberFormat('en-US', options).format(price)
  }

  return { darkMode, removeListing, formatPrice }
}