import axios from 'axios'
import type { UploadFileType } from '../interfaces/UploadFileType'

export const uploadImage = async (file: File) => {
  if (!file) return

  try {
    const formData = new FormData()
    // add key/value pairs → name of an unsigned upload preset
    formData.append('upload_preset', 'vite-furniture')
    formData.append('file', file as File) // // file to upload

    const url = 'https://api.cloudinary.com/v1_1/dyswc6bns/image/upload'
    const { data } = await axios.post<UploadFileType>(url, formData)
    const { secure_url, delete_token } = data

    return { secure_url, delete_token }
  } catch (error) {
    console.error('Error sending the image, check the log')
    console.log(error)
    return null
  }
}

export const destroyImage = async (imageToken) => {
  try {
    const formData = new FormData()
    formData.append('upload_preset', 'vite-furniture')
    formData.append('token', imageToken) // valid for 10 min

    const url = 'https://api.cloudinary.com/v1_1/dyswc6bns/delete_by_token'

    const { data } = await axios.post(url, formData)

    console.log(data)

    return true
  } catch (error) {
    console.error('Error deleting the image, check the log')
    console.log(error)
    return null
  }
}