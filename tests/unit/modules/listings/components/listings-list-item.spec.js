import { shallowMount } from '@vue/test-utils'
import ListingsListItem from '@/modules/listings/components/ListingsListItem.vue'
import { useListingsListItem } from '@/modules/listings/composables/useListingsListItem'
import listingsMockData from '../../../__mocks__/mock-data/listings-data'


describe('ListingsListItem.vue component', () => {

  let wrapper
  // SETUP - run prior to each unit test
  beforeEach(() => {

    wrapper = shallowMount(ListingsListItem, {
      global: {
        mocks: { $t: (translation) => translation }
      },
      props: {
        listing: { 
          listingsMockData
        }
      }
    })
  })

  test('formatPrice fc should format prices correctly', () => {
    const { formatPrice } = useListingsListItem()
    // penny converted
    expect(formatPrice(1)).toMatch('$1.00')
    expect(formatPrice(99)).toMatch('$99.00')
  })

})