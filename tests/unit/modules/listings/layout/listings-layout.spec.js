import { shallowMount } from '@vue/test-utils'
import ListingsLayout from '@/modules/listings/layout/ListingsLayout.vue'
import useDarkMode from '@/composables/useDarkMode'

describe('ListingsLayout.vue', () => {
  const wrapper = shallowMount(ListingsLayout, {
    slots: {
      default: [
        '<code id="one">Test Content</code>',
        '<code id="two">Test Content Two</code>'
      ]
    }
  })

  test('should render the component correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('layout default slot', () => {
    expect(wrapper.find('#one').exists()).toBeTruthy()
    expect(wrapper.find('#two').exists()).toBeTruthy()

    const codeElements = wrapper.find('div').findAll('code')
    expect(codeElements.at(0).text()).toMatch('Test Content')
    expect(codeElements.at(1).text()).toMatch('Test Content Two')
  })

  test('should render lightmode by default and darkmode', async () => {
    expect(wrapper.vm.darkMode).toBeFalsy()
    expect(wrapper.find('header').classes('bg-aliceblue')).toBeFalsy()

    const { darkMode } = useDarkMode()
    darkMode.value = true

    expect(await wrapper.vm.darkMode).toBeTruthy()
    expect(wrapper.find('header').classes('bg-aliceblue')).toBeTruthy()
  })
})