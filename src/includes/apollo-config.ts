import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core';
import fetch from 'cross-fetch';

// Declare the HTTP endpoint connection to GraphQL API
const httpLink = createHttpLink({
  uri: 'http://localhost:3000/api',
  fetch
});

// Store the results of the API calls locally, in memory cache
const cache = new InMemoryCache();

const apolloClient = new ApolloClient({
  link: httpLink,
  cache
});

export default apolloClient