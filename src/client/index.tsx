import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import 'bootstrap/dist/css/bootstrap.css';

import App from './containers/App';
import { client } from './data/apollo';


ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('app')
);

