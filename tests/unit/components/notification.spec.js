import { shallowMount } from '@vue/test-utils'
import Notification from '@/components/Notification.vue'
import useNotification from '@/composables/useNotification'

describe('Tests on the Notification.vue component', () => {
  let wrapper
  // SETUP - run prior to each unit test
  beforeEach(() => {
    vi.useFakeTimers() // tell vitest we use mocked time
    // render the component
    wrapper = shallowMount(Notification, {
      props: {
        notification: { message: 'Testing Notification', active: true },
        toggleNotification: vi.fn()
      }
    })
  })

  test('should render the component correctly', () => {
    expect(wrapper.html()).toMatchSnapshot()
  })

  test('should dynamically render Notification.vue', async () => {
    expect(wrapper.find('.notification').exists()).toBeTruthy()
    expect(wrapper.find('p').text()).toMatch('Testing Notification')

    await wrapper.setProps({ notification: { active: false } })

    expect(wrapper.find('.notification').exists()).toBeFalsy()
    expect(wrapper.find('p').exists()).toBeFalsy()
  })

  test('notification composable should work correctly', () => {
    const { notification, setNotification, toggleNotification } = useNotification()

    // default values
    expect(typeof notification.message).toBe('string')
    expect(notification.message).toBe('')
    expect(notification.active).toBeTypeOf('boolean')
    expect(notification.active).toBeFalsy()

    // functions
    setNotification('Testing Notification')
    expect(notification.message).toMatch('Testing Notification')
    expect(notification.active).toBeTruthy()

    toggleNotification()
    expect(notification.active).toBeFalsy()
    vi.advanceTimersByTime(30000)
    expect(notification.active).toBeTruthy()
  })

})