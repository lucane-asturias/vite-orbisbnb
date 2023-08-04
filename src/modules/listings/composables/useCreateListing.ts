import { ref } from 'vue'
import { i18n } from '@/includes/i18n'
import Swal from 'sweetalert2'
import { v4 as uuidv4 } from 'uuid'
import { uploadImage } from '../helpers/cloudinaryAPI'
import { useListingsStore } from '../store/listingsStore'

import useNotification from '@/composables/useNotification'
import useGraphQL from '@/composables/useGraphQL'
import AddListingMutation from '@/graphql/AddListingMutation'

import { useListingsPage } from './useListingsPage'

import type { FormType } from '../interfaces/FormType'

const { toggleCreationMode } = useListingsPage()

const { useMutationComposable } = useGraphQL()
const { mutate: createListing } = useMutationComposable(AddListingMutation)

const { setNotification } = useNotification()

const notification_msg = ref<string>('')

const creation_in_submission = ref<boolean>(false)
const creation_show_alert = ref<boolean>(false)
const creation_alert_color = ref<string>('bg-blue-500')
const creation_alert_msg = ref<string>('Please wait! Your furniture is being added.')

const { locale } = i18n.global

export const useCreateListing = () => {
  

  const hiddenSelectRef = ref<null | HTMLInputElement>(null)
  const localImage = ref<boolean | undefined | object>(false)
  const cloudinaryImageUrl = ref<null | string>(null)
  const cloudinaryToken = ref<null | string>(null)

  const fileImage = ref<boolean | undefined | File>(false)  
  const fileError = ref<boolean>(false)  
  const fileErrorText = ref<string>('Please, select a image file')  

  const debounceTimeout = ref(null)
  const priceAmount = ref<number>(1)
  const priceError = ref<null | number>(null)
  const priceErrorText = ref<string>('Please, fill in $1,00 or more.')

  const isPriceZero = (event) => {
    if (debounceTimeout.value) clearTimeout(debounceTimeout.value)

    debounceTimeout.value = setTimeout(() => {
      if (priceAmount.value <=  0.99) {
        priceError.value = true
        return
      }

      priceError.value = false
      return
    }, 1500)
  }

  const onSelectImage = () => hiddenSelectRef.value.click()

  const onSelectedImage = async (event: Event<HTMLInputElement>) => {
    if (!event.target.files.length) {
      fileImage.value = undefined
      fileError.value = true
      localImage.value = false
      return
    }

    creation_in_submission.value = false
    fileError.value = false

    const fileTemp: File = event.target.files[0]

    if (tempFile.type === 'image/jpeg' || 'image/png') {
      fileImage.value = fileTemp

      const reader = new FileReader()
      reader.onload = () => localImage.value = reader.result
      reader.readAsDataURL(fileImage.value)
    } else {
      switch (locale.value) {
        case 'pt':
          fileError.value = 'Arquivo inválido. Carregue uma imagem no formato JPG ou PNG.'
          creation_in_submission.value = true
          break;
        case 'es':
          fileError.value = 'Fichero no valido. Suba un fichero JPG o PNG.'
          creation_in_submission.value = true
          break;
        case 'ja':
          fileError.value = 'ファイルが有効ではありません。 JPGまたはPNG形式のイメージをアップロードしてください。'
          creation_in_submission.value = true
          break;
        default:
          fileError.value = 'Invalid file. Upload an image in JPG or PNG format.'
      }
    }
  }

  const onCreateListing = async (values: FormType) => {
    if (!localImage.value && fileImage.value === false || undefined) {
      switch (locale.value) {
        case 'pt':
          Swal.fire('Selecione uma imagem', 'Por favor, não esqueça de selecionar uma imagem!')
          break;
        case 'es':
          Swal.fire('Seleccione una fotografía', 'Por favor, ¡no olvide seleccionar una imagen!')
          break;
        case 'ja':
          Swal.fire('イメージを選択してください', 'イメージを選択することを忘れないでください')
          break;
        default:
          Swal.fire('Select an image', 'Please, don\'t forget to select one picture!')
      }
      return
    } else if (priceAmount.value === 0) {
      switch (locale.value) {
        case 'pt':
          Swal.fire('Preço obrigatório', 'Por favor, preencha o campo de preço')
          break;
        case 'es':
          Swal.fire('Precio requerido', 'Por favor, rellene el campo de precio')
          break;
        case 'ja':
          Swal.fire('価格必須', '価格欄に入力してください')
          break;
        default:
          Swal.fire('Price required', 'Please, fill in the price field')
      }
      return
    }

    creation_show_alert.value = true
    creation_in_submission.value = true
    creation_alert_color.value = 'bg-blue-500'

    switch (locale.value) {
      case 'pt':
        creation_alert_msg.value = 'Por favor, aguarde! Seu mobiliário está sendo adicionado.'
        break;
      case 'es':
        creation_alert_msg.value = 'Espere, por favor. Su mueble está siendo añadido.'
        break;
      case 'ja':
        creation_alert_msg.value = 'お待ちください。 貴方の家具が追加されています。'
        break;
      default:
        creation_alert_msg.value = 'Please wait! Your furniture is being added.'
    }

    if (!navigator.onLine) {
     // if user is not online, they can't create listings
      creation_show_alert.value = true
      creation_alert_color.value = 'bg-red-500'
      creation_alert_msg.value = 'You are offline. Please try again later.'
      return
    }

    const listingsStore = useListingsStore()

    const id = uuidv4()
    const { 
      city: title, address, description, baths: numOfBaths, 
      guests: numOfGuests, beds: numOfBeds, rating: stringRating 
    } = values

    try {
      // Upload image to cloudinary: token only valid for 10 minutes
      const { secure_url, delete_token } = await uploadImage(fileImage.value)

      cloudinaryImageUrl.value = secure_url
      cloudinaryToken.value = delete_token
    } catch (error) {
      console.error('Error uploading image: check the logs', error)
      return
    }

    const formattedPrice: string = String(priceAmount.value).replace('.', '').replace(',', '')
    const price: number = parseInt(formattedPrice)
    const image: string = cloudinaryImageUrl.value
    const rating: number = parseInt(stringRating)

    try {
      const { data } = await createListing({
        id, title, description, image, address, price, 
        numOfGuests, numOfBeds, numOfBaths, rating
      })
      
      // listingsStore.setListings(data["addListing"])

      listingsStore.submitCloudinaryTokenID(id, cloudinaryToken.value)
    } catch (error) {
      creation_in_submission.value = true
      creation_alert_color.value = 'bg-red-500'
      creation_alert_msg.value = 'An unexpected error ocurred. Please try again later.'
      console.error('Error: check the logs', error)
      setTimeout(() => creation_in_submission.value = false, 5000)
      return
    }

    creation_alert_color.value = 'bg-green-500'

    switch (locale.value) {
      case 'pt':
        creation_alert_msg.value = 'Sua mobília foi adicionada!'
        break;
      case 'es':
        creation_alert_msg.value = '¡Éxito! Su mueble ha sido añadido.'
        break;
      case 'ja':
        creation_alert_msg.value = '成功! 貴方の家具は追加されました。'
        break;
      default:
        creation_alert_msg.value = 'Your furniture has been added!'
    }

    Swal.fire('Success!', `${creation_alert_msg}`, 'success')
    setTimeout(() => creation_in_submission.value = false, 5000)

    switch (locale.value) {
      case 'pt':
        notification_msg.value = 'Uma nova mobília a listagem foi adicionada!'
        break;
      case 'es':
        notification_msg.value = '¡Se ha añadido un nuevo mueble a la lista!.'
        break;
      case 'ja':
        notification_msg.value = 'リストに新しい家具が追加されました！'
        break;
      default:
        notification_msg.value = 'A new furniture listing has been added!'
    }

    setNotification(`${notification_msg.value}`)

    localImage.value = false
    cloudinaryImageUrl.value = null
    setTimeout(() => creation_show_alert.value = false, 3000)
    toggleCreationMode()
  }

  return {
    creation_in_submission, creation_show_alert,
    creation_alert_color, creation_alert_msg,

    hiddenSelectRef, localImage, cloudinaryImageUrl,
    fileImage, fileError, fileErrorText,
    priceAmount, priceError, priceErrorText,

    onCreateListing, onSelectImage,
    onSelectedImage, isPriceZero
  }
}