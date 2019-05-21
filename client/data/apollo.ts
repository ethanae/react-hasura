import { split } from 'apollo-link';
import ApolloClient from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { WebSocketLink } from 'apollo-link-ws';
import { getMainDefinition } from 'apollo-utilities';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { SubscriptionClient } from 'subscriptions-transport-ws';

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

export const client = new ApolloClient({
  link,
  cache: new InMemoryCache({
    addTypename: true,
  })
});

type Definition = { kind: string; operation?: string; };