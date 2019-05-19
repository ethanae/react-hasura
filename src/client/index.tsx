import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import 'bootstrap/dist/css/bootstrap.css';
import { client } from './data/apollo';

import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import AppRouter from './components/AppRouter';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ToastsContainer position={ToastsContainerPosition.BOTTOM_RIGHT} store={ToastsStore} />
    <AppRouter />
  </ApolloProvider>,
  document.getElementById('app')
);

