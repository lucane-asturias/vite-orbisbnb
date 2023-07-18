import gql from "graphql-tag";

export const typeDefs = gql`

  # This "Listing" type defines the queryable fields.
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

  # This "Query" type lists all of the available queries, along with the return type
  type Query {
    listings: [Listing!]!
  }

  # This "Mutation" type expects a scalar type ID to remove a listing
  type Mutation {
    deleteListing(id: ID!): Listing!
  }

  type Mutation {
    deleteAllListings(zero: Int!): Int!
  }
`;
