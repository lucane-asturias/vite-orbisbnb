import { listings, type Listing } from "../listings";

// Resolvers define how to fetch the types defined in the schema.

export const resolvers = {
  Query: {
    listings: () => {
      return listings
    },
    searchListing: (_root: undefined, { id }: { id: string }) => {
      return listings.find((listing) => listing.id === id)
    }
  },
  Mutation: {
    addListing: (_root: undefined, { id, title, description, image, address, price, numOfGuests, numOfBeds, numOfBaths, rating }: Listing) => {
      listings.push({ id, title, description, image, address, price, numOfGuests, numOfBeds, numOfBaths, rating })
      return {
        id, title, description, image, address, price, 
        numOfGuests, numOfBeds, numOfBaths, rating
      }
    },
    deleteListing: (_root: undefined, { id }: { id: string }) => {
      for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
          return listings.splice(i, 1)[0];
        }
      }

      throw new Error("Failed to deleted listing");
    },
    deleteAllListings: (_root: undefined, { zero }: { zero: number }) => {
      listings.length = zero
      return zero
    }
  }
};