export const formatListing = (listings: object) => {
  const formattedListings = []

  for (let key of Object.keys(listings)) {
    const listingId = listings[key].id
    const title = listings[key].title
    const description = listings[key].description
    const image = listings[key].image
    const address = listings[key].address
    const price = listings[key].price
    const numOfGuests = listings[key].numOfGuests
    const numOfBeds = listings[key].numOfBeds
    const numOfBaths = listings[key].numOfBaths
    const rating = listings[key].rating

    formattedListings.push({ 
      id: listingId, title, description, image, address, 
      price, numOfGuests, numOfBeds, numOfBaths, rating
    })
  }
  return formattedListings
}