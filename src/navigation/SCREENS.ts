import {Order} from '../redux/demoReducer';

export type RootStackParamList = {
  LandingScreen: undefined;
  CreateOrderScreen: undefined;
  TabNavigation: undefined;
  OrderDetailScreen: {order: Order};
};

export type OrderStackParamList = {
  OrdersScreen: undefined;
};

export type DeliveryStackParamList = {
  DeliveriesScreen: undefined;
  DeliveryDetailScreen: {deliveryId: string};
};

export type HomeTabParamList = OrderStackParamList &
  DeliveryStackParamList & {
    OrdersScreen: undefined;
    DeliveriesScreen: undefined;
  };
