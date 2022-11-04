import AsyncStorage from '@react-native-async-storage/async-storage';
import create from 'zustand';
import {persist, devtools} from 'zustand/middleware';
import {Delivery, Order} from '../types';

export interface DemoState {
  orders: Order[];
  deliveries: Delivery[];
  pushOrder: (order: Order) => void;
  deleteOrder: (orderId: string) => void;
  deleteOrders: (orderIds: string[]) => void;
  mergeOrders: (orderIds: string[]) => void;
  deleteDelivery: (deliveryId: string) => void;
  toggleDeliveryStatus: (deliveryId: string) => void;
}

export const useDemoStore = create<DemoState>()(
  devtools(
    persist(
      set => ({
        orders: [],
        deliveries: [],
        pushOrder: async (order: Order) =>
          set(state => ({orders: state.orders.concat(order)})),

        deleteOrder: (orderId: string) =>
          set(state => ({
            orders: state.orders.filter(itm => itm.code !== orderId),
          })),

        deleteOrders: (orderIds: string[]) =>
          set(state => ({
            orders: state.orders.filter(itm => !orderIds.includes(itm.code)),
          })),

        mergeOrders: (orderIds: string[]) =>
          set(state => {
            const ordersToMerge = state.orders.filter(itm =>
              orderIds.includes(itm.code),
            );

            const deliveries = state.deliveries.concat({
              orders: ordersToMerge,
              id: 'd_' + String(Math.trunc(Math.random() * 10000)),
              status: 'READY',
            });

            const orders = state.orders.filter(
              itm => !orderIds.includes(itm.code),
            );
            return {orders, deliveries};
          }),

        deleteDelivery: (deliveryId: string) =>
          set(state => {
            const delivery = state.deliveries.find(
              itm => itm.id === deliveryId,
            );
            if (delivery) {
              const orders = state.orders.concat(delivery.orders);
              const deliveries = state.deliveries.filter(
                itm => !deliveryId.includes(itm.id),
              );
              return {orders, deliveries};
            }
            return {};
          }),

        toggleDeliveryStatus: (deliveryId: string) =>
          set(state => {
            const delivery = state.deliveries.find(
              itm => itm.id === deliveryId,
            );
            if (delivery) {
              delivery.status = delivery.status === 'READY' ? 'SENT' : 'READY';
            }
            return {...state};

            // const deliveries = [...state.deliveries];
            // const delivery = deliveries.find(itm => itm.id === deliveryId);
            // if (delivery) {
            //   delivery.status = delivery.status === 'READY' ? 'SENT' : 'READY';
            //   return {deliveries};
            // }
            // return {};
          }),
      }),
      {
        name: 'order-storage',
        getStorage: () => AsyncStorage, // (optional) by default, 'localStorage' is used
      },
    ),
  ),
);

const a = 10;
