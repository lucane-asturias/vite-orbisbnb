import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';

// Declare the HTTP endpoint connection to GraphQL API
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/api',
});

// Store the results of the API calls locally, in memory cache
const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
});

export default apolloClient