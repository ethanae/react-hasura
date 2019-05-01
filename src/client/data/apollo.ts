import ApolloClient from 'apollo-boost';

export const client = new ApolloClient({
  uri: 'http://localhost:1337/v1alpha1/graphql',
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': '"jkasvbdhbjaasdkahbsd"'
  }
});