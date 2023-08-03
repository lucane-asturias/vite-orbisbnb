import { shallowMount, RouterLinkStub } from '@vue/test-utils'
import { createPinia, setActivePinia } from 'pinia'
import NavbarMenu from '@/components/NavbarMenu.vue'
import useDarkMode from '@/composables/useDarkMode'
import { i18n } from '@/includes/i18n'

describe('Tests on the NavbarMenu.vue component', () => {

  let wrapper
  // SETUP - run prior to each unit test
  beforeEach(() => {
    // creates a fresh pinia and make it active so it's automatically picked
    // up by any useStore() call without having to pass it to it:
    // `useStore(pinia)`
    setActivePinia(createPinia())
    // render the component
    wrapper = shallowMount(NavbarMenu, {
      global: {
        components: { 'router-link': RouterLinkStub },
        mocks: { $t: (translation) => translation },
        plugins: [i18n],
      }
    })
  })

  test('should match snapshot', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('click event should toggle darkmode', () => {
    expect(wrapper.vm.darkMode).toBeFalsy()
    wrapper.find('#darkmodetoggle').trigger('click')
    expect(wrapper.vm.darkMode).toBeTruthy()
  })

  test('orbisbnb routerlink should lead to the root page', () => {
    expect(wrapper.findComponent(RouterLinkStub).props().to).toMatch('/')
  })

  test('darkmode computed fc should return the english version', () => {
    expect(wrapper.vm.darkModeButtonText).toMatch('Light Mode')
    wrapper.find('#darkmodetoggle').trigger('click')
    expect(wrapper.vm.darkModeButtonText).toMatch('Dark Mode')
  })

  test('darkmode computed fc should return other language', async () => {
    wrapper.vm.locale = 'ja'
    expect(wrapper.vm.darkModeButtonText).toMatch('ダークモード')
    wrapper.find('#darkmodetoggle').trigger('click')
    expect(wrapper.vm.darkModeButtonText).toMatch('ライトモード')
  })

  test('the button for the computed darkModeButtonText shouldve dynamic classes', async () => {
    expect(wrapper.vm.darkMode).toBeTruthy()
    expect(wrapper.find('button').classes('text-gray-100 bg-slate-800 hover:bg-gray-900'))
    wrapper.find('#darkmodetoggle').trigger('click')
    expect(wrapper.vm.darkMode).toBeFalsy()
    expect(wrapper.find('button').classes('text-gray-900 bg-slate-200 hover:bg-gray-300'))
  })

  test('select language button should be disabled by default', () => {
    expect(wrapper.findAll('option').at(1).element.disabled).toBeTruthy()
  })

})