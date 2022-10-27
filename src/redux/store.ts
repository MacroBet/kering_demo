import {configureStore} from '@reduxjs/toolkit';
import {persistStore} from 'redux-persist';
import {rootReducer} from './rootReducer';
import {DemoData} from './demoReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const demoState = (state: any) => {
  return state.demoState as DemoData;
};
export const persistor = persistStore(store);
