import { split } from 'apollo-link';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';
import gql from 'graphql-tag';

const graphqlApiUri = 'http://localhost:1337/v1alpha1/graphql';
const graphqlSocketUri = 'ws://localhost:1337/v1alpha1/graphql';
const hasuraReqHeaders = {
  'content-type': 'application/json',
  'x-hasura-admin-secret': 'jkasvbdhbjaasdkahbsd'
};

const httpLink = new HttpLink({
  uri: graphqlApiUri, 
  headers: hasuraReqHeaders
});

const webSocketLink = new WebSocketLink(
  new SubscriptionClient(graphqlSocketUri, {
    reconnect: true,
    connectionParams: { headers: hasuraReqHeaders }
  }
));

const link = split(
  ({ query }) => {
    const { kind, operation }: Definition = getMainDefinition(query);
    return kind === 'OperationDefinition' && operation === 'subscription';
  },
  webSocketLink,
  httpLink
);
const typeDefs = gql`
  extend type Query {
    progress: Int!
  }

  extend type Mutation {
    updateProgress(progress: Int!): [Launch]
  }
`;
const cache = new InMemoryCache();
export const client = new ApolloClient({
  link,
  cache,
  typeDefs,
  resolvers: {}
});

cache.writeData({
  data: {
    progress: null,
    progressMessage: 'Click the Aegis to initialise the app',
    visibilityFilter: 'SHOW_ALL',
    networkStatus: {
      __typename: 'NetworkStatus',
      isConnected: false,
    },
  },
});

type Definition = { kind: string; operation?: string; };

export type Client = typeof client;