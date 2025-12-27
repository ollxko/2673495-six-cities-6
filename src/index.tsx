import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app';
import { offersMocks } from './mocks/offers';
import { Provider } from 'react-redux';
import { store } from './store';
import { fillOffers } from './store/action';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
store.dispatch(fillOffers(offersMocks));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App offers={offersMocks}></App>
    </Provider>
  </React.StrictMode>
);
