import {Delivery, Order} from '../redux/demoReducer';

export type RootStackParamList = {
  LandingScreen: undefined;
  CreateOrderScreen: undefined;
  TabNavigation: undefined;
  OrderDetailScreen: {order: Order};
};

export type HomeTabParamList = {
  OrdersScreen: undefined;
  DeliveriesScreen: undefined;
  DeliveryDetailScreen: {deliveryId: string};
};
