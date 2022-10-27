import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers} from '@reduxjs/toolkit';
import {persistReducer} from 'redux-persist';
import {demoReducer} from './demoReducer';

interface Storage {
  getItem(key: string, ...args: Array<any>): any;
  setItem(key: string, value: any, ...args: Array<any>): any;
  removeItem(key: string, ...args: Array<any>): any;
}

class RealmStorage implements Storage {
  // TODO attach realm persistor
  getItem(key: string, ...args: Array<any>): any {}
  setItem(key: string, value: any, ...args: Array<any>): any {}
  removeItem(key: string, ...args: Array<any>): any {}
}

export const realmStorage = new RealmStorage();

export const rootReducer = combineReducers({
  demoState: persistReducer(
    {
      key: 'store.myapp.demo',
      keyPrefix: '',
      storage: AsyncStorage, // to use realm storage just replace AsyncStorage with realmStorage
    },
    demoReducer,
  ),
});
