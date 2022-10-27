import {createSlice} from '@reduxjs/toolkit';
import {store} from './store';

export type OrderType = 'NEW' | 'OLD';
export type DeliveryStatus = 'READY' | 'SENT';

export interface Order {
  code: string;
  type: OrderType;
}

export interface Delivery {
  id: string;
  status: DeliveryStatus;
  orders: Order[];
}

export interface DemoData {
  orders: Order[];
  deliveries: Delivery[];
}

const demoState: DemoData = {
  orders: [],
  deliveries: [],
};

const demoSlice = createSlice({
  name: 'demo',
  initialState: demoState,
  reducers: {
    _addOrder(state, action: {payload: Order}) {
      state.orders.push(action.payload);
    },

    _deleteOrder(state, action: {payload: string}) {
      state.orders = state.orders.filter(itm => itm.code !== action.payload);
    },

    _deleteOrders(state, action: {payload: string[]}) {
      state.orders = state.orders.filter(
        itm => !action.payload.includes(itm.code),
      );
    },

    _mergeOrders(state, action: {payload: string[]}) {
      const ordersToMerge = state.orders.filter(itm =>
        action.payload.includes(itm.code),
      );

      state.deliveries.push({
        orders: ordersToMerge,
        id: 'd_' + String(Math.trunc(Math.random() * 10000)),
        status: 'READY',
      });

      state.orders = state.orders.filter(
        itm => !action.payload.includes(itm.code),
      );
    },

    _deleteDelivery(state, action: {payload: string}) {
      const delivery = state.deliveries.find(itm => itm.id === action.payload);
      if (delivery) {
        state.orders = state.orders.concat(delivery.orders);
        state.deliveries = state.deliveries.filter(
          itm => !action.payload.includes(itm.id),
        );
      }
    },

    _toggleDeliveryStatus(state, action: {payload: string}) {
      const delivery = state.deliveries.find(itm => itm.id === action.payload);
      if (delivery) {
        delivery.status = delivery.status === 'READY' ? 'SENT' : 'READY';
      }
    },
  },
});

const {
  _addOrder,
  _deleteOrder,
  _deleteOrders,
  _mergeOrders,
  _toggleDeliveryStatus,
  _deleteDelivery,
} = demoSlice.actions;

/**
 * EXPORTED FUNCTIONS
 */

export const pushOrder = (order: Order) => store.dispatch(_addOrder(order));

export const deleteOrder = (orderId: string) =>
  store.dispatch(_deleteOrder(orderId));

export const deleteOrders = (orderIds: string[]) =>
  store.dispatch(_deleteOrders(orderIds));

export const mergeOrders = (orderIds: string[]) =>
  store.dispatch(_mergeOrders(orderIds));

export const toggleDeliveryStatus = (deliveryId: string) =>
  store.dispatch(_toggleDeliveryStatus(deliveryId));

export const deleteDelivery = (deliveryId: string) =>
  store.dispatch(_deleteDelivery(deliveryId));

export const demoReducer = demoSlice.reducer;
