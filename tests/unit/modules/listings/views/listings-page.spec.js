// import { createPinia, setActivePinia } from 'pinia'
// import { shallowMount } from '@vue/test-utils'
// import ListingsPage from '@/modules/listings/views/ListingsPage.vue'
// import { i18n } from '@/includes/i18n'
// import listingsMockData from '../../../__mocks__/mock-data/listings-data'

// import { graphql } from 'graphql'
// import { addMocksToSchema } from '@graphql-tools/mock'
// import { makeExecutableSchema } from '@graphql-tools/schema'
// import { typeDefs } from '../../../../../server-graphql/src/graphql'
// import { resolvers } from '../../../../../server-graphql/src/graphql'

// import ListingsQuery from '@/graphql/ListingsQuery'

// describe('ListingsPage.vue component', () => {

//   let wrapper
//   // SETUP - run prior to each unit test
//   beforeEach(() => {

//     // creates a fresh pinia and make it active so it's automatically picked
//     // up by any useStore() call without having to pass it to it:
//     // `useStore(pinia)`
//     setActivePinia(createPinia())
//     // render the component
//     wrapper = shallowMount(ListingsPage, {
//       global: {
//         mocks: { $t: (translation) => translation },
//         plugins: [i18n]
//       }
//     })
//   })

//   // test('should match snapshot', () => {
//   //   expect(wrapper.html()).toMatchSnapshot()
//   // })

//   test('testing', async () => {
//     // ERROR: Duplicate "graphql" modules -- couldn't fix it
//     const result = await graphql({
//       schema: schemaWithMocks,
//       source: ListingsQuery
//     })
      
//     console.log('Got result', result)
//     wrapper.vm.result = result.data
//     console.log(wrapper.vm.result)
//   })

// })