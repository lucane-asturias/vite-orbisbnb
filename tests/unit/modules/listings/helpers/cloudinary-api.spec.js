import axios from 'axios'

import { 
  uploadImage, 
  destroyImage 
} from '@/modules/listings/helpers/cloudinaryAPI'

describe('uploadImage helper function', () => {

  test('should upload a file, return the image url and delete from cloudinary', async () => {
    // `responseType` is the type of data the server will respond with
    const { data } = await axios.get('https://res.cloudinary.com/dyswc6bns/image/upload/v1635391583/YelpCamp/oira0kbqe1u6ex3niudj.jpg', {
      responseType: 'arraybuffer'
    })
    const file = new File([data], 'image.jpg')

    const { secure_url, delete_token } = await uploadImage(file)
    expect(typeof secure_url).toBe('string')
    expect(typeof delete_token).toBe('string')

    const isImageDeleted = await destroyImage(delete_token)
    expect(isImageDeleted).toBeTruthy()
  })
  
})