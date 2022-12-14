import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from './reducers/userReducer';

const persistConfig = {
  key: 'root',
  storage,
};
const reducer = combineReducers({
  myUserReducer: userReducer,
});
const persistedReducer = persistReducer(persistConfig, reducer);

export const store = configureStore({ reducer: persistedReducer });
export const persistor = persistStore(store);
