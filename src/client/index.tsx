import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import ApolloClient from 'apollo-boost';
import 'bootstrap/dist/css/bootstrap.css';

import App from './containers/App';

const client = new ApolloClient({
  uri: 'http://localhost:1337/v1alpha1/graphql',
  headers: {
    'content-type': 'application/json',
    'x-hasura-admin-secret': '"jkasvbdhbjaasdkahbsd"'
  }
});


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
);

