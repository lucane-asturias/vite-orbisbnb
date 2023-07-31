import gql from 'graphql-tag';

const AddListingMutation = gql`
  mutation AddListing($id: ID!, $title: String!, $description: String!, $image: String!, $address: String!, $price: Int!, $numOfGuests: Int!, $numOfBeds: Int!, $numOfBaths: Int!, $rating: Int!) {
    addListing(id: $id, title: $title, description: $description, image: $image, address: $address, price: $price, numOfGuests: $numOfGuests, numOfBeds: $numOfBeds, numOfBaths: $numOfBaths, rating: $rating) {
      id,
      title,
      description,
      image,
      address,
      price,
      numOfGuests,
      numOfBeds,
      numOfBaths,
      rating
    }
  }
`;

export default AddListingMutation;
