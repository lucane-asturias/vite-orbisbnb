import { ref } from 'vue'
import useNotification from './useNotification'

const darkModeActive = ref(false)

const useDarkMode = () => {
  const { setNotification } = useNotification()

  const toggleDarkMode = (): { active: boolean } => {
    darkModeActive.value = !darkModeActive.value

    const modeType = darkModeActive.value ? 'Dark Mode' : 'Light Mode'
    return setNotification(`${modeType} turned on!`)
  }

  return { 
    darkMode: darkModeActive,
    toggleDarkMode
  }
}

export default useDarkMode
