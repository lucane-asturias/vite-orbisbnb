import gql from 'graphql-tag'

//  Query all field from the query listings
const ListingsQuery = gql`
  query Listings {
    listings {
      id
      title
      description
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`

export default ListingsQuery
