import { defineStore } from 'pinia'
import { type listing as ListingType } from '../interface/listing'
// import { listings as seedData } from '../../../../server-graphql/src/listings'
import { formatListing } from '../helpers/formatListing'

interface ListingsState { listings: ListingType[] | null }

export const useListingsStore = defineStore('listingsStore', {
  state: () => ({
    listings: undefined,
    searchListingTitle: ''
  } as ListingsState),
  actions: {
    setListings(refetchedListings) {
      this.listings = undefined // Accomodate new listings (same array gets retrieved)
      const listingsObj = formatListing(refetchedListings) // Format the array returned from the server
      this.listings = listingsObj
    },
    submitCloudinaryTokenID(id, deleteToken) {
      const tenMilliseconds = 600000
      const expiresIn = new Date().getTime() + tenMilliseconds

      if (!localStorage.getItem('tokens')) {
        const newTokenList = []
        newTokenList.push({ id, deleteToken, expiresIn })
        localStorage.setItem('tokens', JSON.stringify(newTokenList))
      } else {
        const storageTokens = JSON.parse(localStorage.getItem('tokens'))
        storageTokens.push({ id, deleteToken, expiresIn })
        localStorage.setItem('tokens', JSON.stringify(storageTokens))
      }
    },
    storageTimerById(id) {
      if (!localStorage.getItem('tokens')) return false
      
      const presentMilliseconds = new Date().getTime()
      const tokenObj = this.getStorageTokenById(id)
      // If 10 mins has passed
      if (presentMilliseconds >= tokenObj?.expiresIn) return true
      return false
    },
    removeStorageTokenObj(id) {
      const storageTokens = JSON.parse(localStorage.getItem('tokens'))
      const tokenIndexToRemove = storageTokens.findIndex(token => token.id === id)
      storageTokens.splice(tokenIndexToRemove, 1)
      localStorage.setItem('tokens', JSON.stringify(storageTokens))
    }
  },
  getters: {
    getStorageTokenById: (state) => {
      return (id) => {
        const storageTokens = JSON.parse(localStorage.getItem('tokens'))
        return storageTokens.find(token => token.id === id)
      }
    },
    getListingById: (state) => {
      return (id) => {
        return state.listings.find(listing => listing.id === id)
      }
    },
    getListingsByTitle: (state) => {
      return (title = ''): ListingType => {
        if (title?.length === 0) return state.listings
        else if (!state.listings.length === 0) return

        return state.listings.filter(
          listing => listing.title.toLowerCase().includes(title.toLowerCase())
        )
      }
    }, 
  }
})