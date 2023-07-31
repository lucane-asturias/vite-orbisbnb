import { ref } from 'vue'
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

const creation_in_submission = ref<boolean>(false)
const creation_show_alert = ref<boolean>(false)
const creation_alert_color = ref<string>('bg-blue-500')
const creation_alert_msg = ref<string>('Please wait! Your furniture is being added.')

export const useCreateListing = () => {
  const listingsStore = useListingsStore()

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

    fileError.value = false
    const fileTemp: File = event.target.files[0]

    fileImage.value = fileTemp

    const reader = new FileReader()
    reader.onload = () => localImage.value = reader.result
    reader.readAsDataURL(fileImage.value)
  }

  const onCreateListing = async (values: FormType) => {
    if (!localImage.value && fileImage.value === false || undefined) {
      Swal.fire("Select an image", "Please, don't forget to select one picture!")
      return
    } else if (priceAmount.value === 0) {
      Swal.fire("Price required", "Please, fill out the price field")
      return
    }

    creation_show_alert.value = true
    creation_in_submission.value = true
    creation_alert_color.value = 'bg-blue-500'
    creation_alert_msg.value = 'Please wait! Your furniture is being added.'

    const id = uuidv4()
    const { 
      city: title, address, description, baths: numOfBaths, 
      guests: numOfGuests, beds: numOfBeds, rating: stringRating 
    } = values

    try {
      // Upload image to cloudinary: token only valid for 10 minutes
      const { secure_url, delete_token } = await uploadImage(fileImage.value)
      if (!secure_url || !delete_token) return console.error('Something unexpected ocurred')

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
    creation_alert_msg.value = 'Success! Your furniture has been added!'
    setTimeout(() => creation_in_submission.value = false, 5000)
    Swal.fire('Success!', 'The furniture was added successfully!', 'success')
    setNotification("A new listing has been created!")

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