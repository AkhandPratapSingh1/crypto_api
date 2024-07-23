// redux/store.ts
import { asyncThunkCreator, configureStore } from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import priceReducer from './reducers/priceReducer';

// Combine reducers if you have multiple reducers
const rootReducer = {
  prices: priceReducer,
};

// Configure store with correct middleware
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(),
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
