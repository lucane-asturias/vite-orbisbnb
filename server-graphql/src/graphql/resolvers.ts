import { listings } from "../listings";

// Resolvers define how to fetch the types defined in the schema.

export const resolvers = {
  Query: {
    listings: () => {
      return listings
    }
  },
  Mutation: {
    deleteListing: (_root: undefined, { id }: { id: string }) => {
      for (let i = 0; i < listings.length; i++) {
        if (listings[i].id === id) {
          return listings.splice(i, 1)[0];
        }
      }

      throw new Error("Failed to deleted listing");
    },
    deleteAllListings: (_root: undefined, { zero }: { zero: number }) => {
      return listings.length = zero
    }
  }
};
