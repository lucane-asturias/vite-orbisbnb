import { reactive } from 'vue'

const data = reactive({
  message: '',
  active: false
})

const useNotification = () => {
  
  const setNotification = (newMessage: string) => {
    data.message = newMessage
    data.active = true
    setTimeout(() => data.active = false, 30000)
  }

  const toggleNotification = () => {
    data.active = !data.active
    setTimeout(() => data.active = !data.active, 30000)
  }

  return {
    notification: data,
    setNotification,
    toggleNotification
  }
}

export default useNotification
