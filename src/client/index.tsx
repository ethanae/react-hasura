import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import 'bootstrap/dist/css/bootstrap.css';

import App from './containers/App';
import { client } from './data/apollo';

import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';


ReactDOM.render(
  <ApolloProvider client={client}>
    <ToastsContainer position={ToastsContainerPosition.BOTTOM_RIGHT} store={ToastsStore} />
    <App />
  </ApolloProvider>,
  document.getElementById('app')
);

