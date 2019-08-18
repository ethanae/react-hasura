import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { ApolloProvider } from "react-apollo";
import 'bootstrap/dist/css/bootstrap.css';
import { client } from './data/apollo';

import { ToastsContainer, ToastsStore, ToastsContainerPosition } from 'react-toasts';
import App from './components/App';

ReactDOM.render(
  <ApolloProvider client={client}>
    <ToastsContainer position={ToastsContainerPosition.BOTTOM_RIGHT} store={ToastsStore} />
    <App client={client}/>
  </ApolloProvider>,
  document.getElementById('app')
);

