<script lang="ts" setup>
  import { computed, ref } from 'vue'
  import { useI18n } from 'vue-i18n'
  import { setLocale } from '@vee-validate/i18n'
  import SearchListing from '@/modules/listings/components/SearchListing.vue'
  import useDarkMode from '../composables/useDarkMode'

  const { darkMode, toggleDarkMode } = useDarkMode()

  const { locale } = useI18n({ useScope: 'global' })

  const openLanguages = ref<boolean>(false)

  const languageToggler = () => openLanguages.value = !openLanguages.value

  const darkModeButtonText = computed<string>(() => {
    switch (locale.value) {
      case 'pt':
        return darkMode.value ? 'Modo Claro' : 'Modo Escuro'
        break;
      case 'es':
        return darkMode.value ? 'Modo Luz' : 'Modo Oscuro'
        break;
      case 'ja':
        return darkMode.value ? 'ライトモード' : 'ダークモード'
        break;
      default:
        return darkMode.value ? 'Light Mode' : 'Dark Mode'
    }
  })

  const changeLocale = (language) => {
    switch (language) {
      case 'pt':
        locale.value = 'pt'
        setLocale('pt_BR')
        break;
      case 'es':
        locale.value = 'es'
        setLocale('es')
        break;
      case 'ja':
        locale.value = 'ja'
        setLocale('ja')
        break;
      default:
        locale.value = 'en'
        setLocale('en')
    }
  }

</script>

<template>
  <nav class="sborder-gray-200 dark:bg-gray-900 relative">
    <menu class="flex justify-between items-center mx-auto p-4 mx-5 lg:mx-7">

      <router-link to="/">
        <span class="self-center text-md md:text-xl font-semibold whitespace-nowrap dark:text-white">
          &#9992; {{ $t('navbar_menu.orbis_bnb') }} &#9992;
        </span>
      </router-link>


      <div class="flex items-center">
        <SearchListing :darkMode="darkMode" />

        <button 
          class="hidden sm:block ml-5 text-md font-semibold py-1 sm:py-3 px-3 rounded shadow float-right" 
          :class="{ 
           'text-gray-100 bg-slate-800 hover:bg-gray-700': darkMode,
           'text-gray-900 bg-slate-200 hover:bg-gray-300': !darkMode
          }"
          @click="toggleDarkMode"
        >
         {{ darkModeButtonText }}
        </button>

        <button @click="languageToggler" class="cursor-pointer border-none text-white mr-3 ml-5 p-0">
          <img class="w-6 h-7 text-transparent"
            alt="Language Switcher" 
            src="https://nodejs.org/static/images/language-picker.svg"
          />
        </button>

        <Transition name="fade">
          <ul v-if="openLanguages"
            class="flex flex-col max-h-96 min-h-48 list-none m-0 overflow-auto py-3 pb-2 absolute right-0 top-full bg-gray-900 z-50">

            <li @click.prevent="changeLocale('en')"
              class="relative inline-block w-full text-center cursor-pointer border-none pb-0 px-9 py-2 pb-2
                bg-transparent text-sm text-slate-300 hover:bg-gray-600 leading-normal hover:underline decoration-1 uppercase"
            >
              {{ $t('language.en') }}
            </li>

            <li @click.prevent="changeLocale('pt')"
            class="relative inline-block w-full text-center cursor-pointer border-none pb-0 px-9 py-3 pb-2
              bg-transparent text-sm text-sm text-slate-300 hover:bg-gray-600 leading-normal hover:underline decoration-1 uppercase"
            >
              {{ $t('language.pt') }}
            </li>

            <li @click.prevent="changeLocale('es')"
            class="relative inline-block w-full text-center cursor-pointer border-none pb-0 px-9 py-3 pb-2
              bg-transparent text-sm text-sm text-slate-300 hover:bg-gray-600 leading-normal hover:underline decoration-1 uppercase"
            >
              {{ $t('language.es') }}
            </li>

            <li @click.prevent="changeLocale('ja')"
            class="relative inline-block w-full text-center cursor-pointer border-none pb-0 px-9 py-3 pb-2
              bg-transparent text-sm text-sm text-slate-300 hover:bg-gray-600 leading-normal hover:underline decoration-1 uppercase"
            >
              {{ $t('language.ja') }}
            </li>

          </ul>
        </Transition>

        <!-- Older solution (couldn't style select correctly) -->
        <!-- <select @click.prevent="changeLocale"
          class="fa cursor-pointer appearance-none text-lg w-11 sm:w-12 h-full sm:h-12 border-l-gray-700 
          py-2.5 sm:py-2.5 px-3 sm:px-3.5 ml-5 rounded-lg leading-tight font-bold tracking-normal lg:tracking-widest 
          border-gray-600 placeholder-gray-400 focus:outline-none"
          :class="{ 
            'text-slate-100 bg-slate-800 hover:bg-gray-700 focus:bg-gray-700': darkMode, 
            'text-slate-600 bg-slate-200 hover:bg-gray-300 focus:bg-gray-300': !darkMode 
          }"
        >
          <option hidden selected value="#" aria-hidden="true">&#xf57d;</option>
          <option disabled>{{ $t('navbar_menu.select_language') }}</option>
          <option value="en">{{ $t('language.en') }}</option>
          <option value="pt">{{ $t('language.pt') }}</option>
          <option value="es">{{ $t('language.es') }}</option>
          <option value="ja">{{ $t('language.ja') }}</option>
        </select> -->

      </div>

      <div id="darkmodetoggle" @click="toggleDarkMode"
        class="block sm:hidden darkmode-fixed-bottom-left"
        :class="darkMode ? 'darkmodetoggle' : ''">
        Toggle darkmode
      </div>

    </menu>
  </nav>
</template>

<style lang="css" scoped>
.fade-leave-active,
.fade-enter-active {
  transition: all 0.3s ease-out;
}

.fade-enter-from,
.fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.darkmode-fixed-bottom-left {
  position: fixed !important;
  z-index: 9999999999;
  bottom: 50px !important;
  top: unset;
  left: 37px;
  /*  
    fixed z-90 bottom-10 inset-x-0 left-12
    cursor-pointer bg-black w-8 h-8 rounded-full
  */
}

#darkmodetoggle {
  cursor: pointer;
  background: #000;
  background: linear-gradient(225deg,#000 50%,#fff 50%);
  width: 33px;
  height: 33px;
  border-radius: 100%;
  border: 1px solid #000;
  font-size: 0; /* remove innertext */
}

#darkmodetoggle:before {
  content: "Enable Darkmode";
  position: absolute;
  top: 50%;
  transform: translatey(-50%);
  left: 100%;
  margin-left: 15px;
  width: 110px;
  padding: 5px 2px;
  border-radius: 10px;
  background: #000;
  color: #fff;
  text-align: center;
  font-size: 11px !important;
  display: none;
}

#darkmodetoggle:hover:before {
  display: block;
  background-color: black;
  color: whitesmoke;
  font-weight: 600;
}

.darkmodetoggle {
  background: linear-gradient(45deg,#000 50%,#fff 50%) !important;
  border: 1px solid #fff;
}

.darkmodetoggle:before {
  content: "Disable Darkmode" !important;
  background: #fff;
  color: #000;
}

.darkmodetoggle:hover:before {
  display: block;
  background-color: whitesmoke !important;
  color: black !important;
  font-weight: 600;
}
</style>