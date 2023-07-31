import gql from "graphql-tag";

export const typeDefs = gql`

  # Defines the queryable fields
  type Listing {
    id: ID!
    title: String!
    description: String!
    image: String!
    address: String!
    price: Int!
    numOfGuests: Int!
    numOfBeds: Int!
    numOfBaths: Int!
    rating: Int!
  }

  # Lists all of the available queries
  type Query {
    listings: [Listing!]!
  }

  type Query {
    searchListing(id: ID!): Listing!
  }

  type Mutation {
    addListing(id: ID!, title: String!, 
      description: String!, image: String!,
      address: String!, price: Int!
      numOfGuests: Int!, numOfBeds: Int!
      numOfBaths: Int!, rating: Int!): Listing!
  }

  type Mutation {
    deleteListing(id: ID!): Listing!
  }

  type Mutation {
    deleteAllListings(zero: Int!): Int!
  }
`;
