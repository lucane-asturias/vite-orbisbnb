import { ref } from 'vue'
import { i18n } from '@/includes/i18n'
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

const { result, loading, error } = useQueryComposable(ListingsQuery)

const { locale } = i18n.global

const creationMode = ref<boolean>(false)

export const useListingsPage = () => {

  const toggleCreationMode = () => creationMode.value = !creationMode.value

  const removeAllListings = async (zero: number) => {
    const listingsStore = useListingsStore()

    let translatedTitle
    let translatedText

    switch (locale.value) {
      case 'pt':
        translatedTitle = 'Tem certeza?'
        translatedText = 'Uma vez excluídas, as listagens não poderão ser restauradas.'
        break;
      case 'es':
        translatedTitle = '¿Está seguro?'
        translatedText = 'Una vez borrados, los listados no pueden restaurarse.'
        break;
      case 'ja':
        translatedTitle = '本当にそれでいいんですか？'
        translatedText = '一度削除されたら、家具を復元することはできません。'
        break;
      default:
        translatedTitle = 'Are you sure?'
        translatedText = 'Once deleted, the listings cannot be restored.'
    }

    const { isConfirmed } = await Swal.fire({
      title: translatedTitle,
      text: translatedText,
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

      let notification_msg
      let deleted_msg

      switch (locale.value) {
      case 'pt':
        notification_msg = 'Todas as listagens foram removidas!'
        deleted_msg = 'Deletados!'
        break;
      case 'es':
        notification_msg = 'Todos los listados han sido eliminados!'
        deleted_msg = 'Eliminados!'
        break;
      case 'ja':
        notification_msg = 'すべてのリストは削除されました！'
        deleted_msg = '削除されました！'
        break;
      default:
        notification_msg = 'All listings have been deleted!'
        deleted_msg = 'Deleted'
    }

      setNotification(`${notification_msg}`)
      Swal.fire(`${deleted_msg}`, '', 'success')
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