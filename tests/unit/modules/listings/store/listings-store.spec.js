import { createPinia, setActivePinia } from 'pinia'

import { useListingsStore } from '@/modules/listings/store/listingsStore'
import { listingsMockState } from '../../../__mocks__/mock-data/test-listings-state'

const formatListings = vi.fn((listings) => listings)
vi.useFakeTimers() // tell vitest we want to use mocked time

describe('Pinia - Tests in the Listings Store', () => {
  // track call history from localStorage
  const setItemSpy = vi.spyOn(Storage.prototype, 'setItem')
  const getItemSpy = vi.spyOn(Storage.prototype, 'getItem')

  let listingsStore
  // SETUP - run prior to each unit test
  beforeEach(() => {
    // creates a fresh pinia and make it active to tests
    setActivePinia(createPinia())

    // create an instance: listings store
    listingsStore = useListingsStore()

    // seed data: initial state
    listingsStore.listings = listingsMockState.listings
  })

  afterEach(() => { 
    localStorage.clear()
    // clear call history
    getItemSpy.mockClear()
    setItemSpy.mockClear()
  })

  // Basics ==================

  test('this is the initial state, should\'ve this state', () => {      
    // will only pass if you comment out line 24 (before seeding state with mock data)
    // expect(listingsStore.listings).toBeUndefined()
    // expect(listingsStore.searchListingTitle).toMatch('')
  })

  test('this is the initial mocked state', () => {
    expect(listingsStore.listings).toEqual(listingsMockState.listings)
    expect(listingsStore.listings.length).toBe(3)
  })

  // Mutations ==================

  test('mutation: setListings', () => {
    const newListingObj = {
      id: '004', title: "Test Title", description: 'Test Description',
      image: 'Test Image', price: 15000, numOfGuests: 2,
      numOfBeds: 1, numOfBaths: 1, rating: 5 
    }

    listingsMockState.listings.push(newListingObj)

    const listingsState = listingsStore.listings
    await listingsStore.setListings(listingsState)

    expect(listingsState.find(
      listing => listing.id === newListingObj.id 
    )).toEqual(newListingObj)
    expect(listingsStore.listings).toEqual(listingsMockState.listings)
    expect(listingsStore.listings.length).toBe(4)
  })

  test('mutation: submitCloudinaryTokenID (if block)', () => {
    listingsStore.submitCloudinaryTokenID('id', 'delete_token')
    expect(getItemSpy).toHaveBeenCalled()
    expect(setItemSpy).toHaveBeenCalled()

    const newToken = [{ 
      id: expect.any(String), 
      deleteToken: expect.any(String),
      expiresIn: expect.any(Number) 
    }]

    expect(JSON.parse(localStorage.getItem('tokens'))).toHaveLength(1)
    expect(JSON.parse(localStorage.getItem('tokens'))).toEqual(newToken)
  })

  test('mutation: submitCloudinaryTokenID (else block)', () => {
    const testTokenObj = [{ 
      id: 'id', 
      deleteToken: 'delete_token', 
      expiresIn: 1691113503827 
    }]
    localStorage.setItem('tokens', JSON.stringify(testTokenObj))

    listingsStore.submitCloudinaryTokenID('id2', 'delete_token2')

    expect(getItemSpy).toHaveBeenCalled()
    expect(setItemSpy).toHaveBeenCalled()
    expect(getItemSpy).toHaveBeenCalledWith('tokens')

    const expectedTokenList = [
      { 
        id: expect.any(String), 
        deleteToken: expect.any(String),
        expiresIn: expect.any(Number) 
      },
      { 
        id: expect.any(String), 
        deleteToken: expect.any(String),
        expiresIn: expect.any(Number) 
      },
    ]

    expect(JSON.parse(localStorage.getItem('tokens'))).toHaveLength(2)
    expect(JSON.parse(localStorage.getItem('tokens'))).toEqual(expectedTokenList)
  })

  test('mutation: storageTimerById', () => {
    const emptyLocalStorage = listingsStore.storageTimerById('id')
    expect(emptyLocalStorage).toBeFalsy()

    const expiresIn = new Date().getTime() + 600000
    const testTokenObj = [{ 
      id: 'id', 
      deleteToken: 'delete_token', 
      expiresIn
    }]
    localStorage.setItem('tokens', JSON.stringify(testTokenObj))

    let isTokenExpired
    
    isTokenExpired = listingsStore.storageTimerById('id')
    expect(isTokenExpired).toBeFalsy()
    expect(getItemSpy).toHaveBeenCalled()

    vi.advanceTimersByTime(600000) // time for token expiration

    isTokenExpired = listingsStore.storageTimerById('id')
    expect(isTokenExpired).toBeTruthy()
    expect(getItemSpy).toHaveBeenCalled()
  })  

  test('mutation: removeStorageTokenObj', () => {
    const testTokenObj = [{ 
      id: 'id', 
      deleteToken: 'delete_token', 
      expiresIn: 1691113503827 
    }]
    
    localStorage.setItem('tokens', JSON.stringify(testTokenObj))
    expect(JSON.parse(localStorage.getItem('tokens'))).toHaveLength(1)
    expect(JSON.parse(localStorage.getItem('tokens')).find(
      token => token.id === testTokenObj[0].id
    )).toBeTruthy()

    listingsStore.removeStorageTokenObj('id')

    expect(JSON.parse(localStorage.getItem('tokens'))).toHaveLength(0)
    expect(JSON.parse(localStorage.getItem('tokens')).find(
      token => token.id === testTokenObj[0].id
    )).toBeFalsy()    
  })  

  // Getters ==================

  test('getters: getStorageTokenById', () => {
    const testTokenObj = [{ 
      id: 'id', 
      deleteToken: 'delete_token', 
      expiresIn: 1691113503827 
    }]
    
    localStorage.setItem('tokens', JSON.stringify(testTokenObj))

    expect(typeof listingsStore.getStorageTokenById(testTokenObj[0].id)).toBe('object')
    expect(listingsStore.getStorageTokenById(testTokenObj[0].id)).toStrictEqual(testTokenObj[0])

    expect(getItemSpy).toHaveBeenCalledTimes(2)
  })

  test('getters: getListingById', () => {
    const mockedListings = listingsMockState.listings
    const listings = listingsStore.listings

    expect(listingsStore.getListingById(mockedListings[0].id)).toEqual(listings[0])
  })

  test('getters: getListingsByTitle', () => {
    const listings = listingsStore.listings

    expect(listingsStore.getListingsByTitle('').length).toBe(3)
    expect(listingsStore.getListingsByTitle('an').length).toBe(2)
    expect(listingsStore.getListingsByTitle('toronto')).toHaveLength(1)
    expect(listingsStore.getListingsByTitle('los angeles')).toEqual([listings[1]])
  })
})