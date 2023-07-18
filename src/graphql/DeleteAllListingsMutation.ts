import gql from 'graphql-tag';

const DeleteAllListingsMutation = gql`
  mutation DeleteAllListings($zero: Int!) {
    deleteAllListings(zero: $zero)
  }
`;

export default DeleteAllListingsMutation;
