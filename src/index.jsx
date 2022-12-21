import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { SocketContext, socket } from './context/socket';
import { store, persistor } from './core/store';
import Main from './Main';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
      <SocketContext.Provider value={socket}>
        <Main />
      </SocketContext.Provider>
    </PersistGate>
  </Provider>,
);
