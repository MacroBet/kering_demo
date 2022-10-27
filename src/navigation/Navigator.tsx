import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import {
  DeliveriesScreen,
  DeliveryDetailScreen,
  LandingScreen,
  OrderDetailScreen,
  OrdersScreen,
} from '../screens';
import {
  DeliveryStackParamList,
  HomeTabParamList,
  OrderStackParamList,
  RootStackParamList,
} from './SCREENS';

const Stack = createStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<HomeTabParamList>();
const OrderStack = createStackNavigator<OrderStackParamList>();
const DeliveryStack = createStackNavigator<DeliveryStackParamList>();

const OrdersTab = () => (
  <OrderStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={'OrdersScreen'}>
    <OrderStack.Screen name={'OrdersScreen'} component={OrdersScreen} />
  </OrderStack.Navigator>
);

const DeliveriesTab = () => (
  <DeliveryStack.Navigator
    screenOptions={{headerShown: false}}
    initialRouteName={'DeliveriesScreen'}>
    <DeliveryStack.Screen
      name={'DeliveriesScreen'}
      component={DeliveriesScreen}
    />
    <DeliveryStack.Screen
      options={{headerShown: true}}
      name="DeliveryDetailScreen"
      component={DeliveryDetailScreen}
    />
  </DeliveryStack.Navigator>
);

export const AppNavigator = () => {
  const TabNavigator = () => (
    <Tab.Navigator
      initialRouteName={'OrdersScreen'}
      screenOptions={{headerShown: false}}>
      <Tab.Screen name="OrdersScreen" component={OrdersTab} />
      <Tab.Screen name="DeliveriesScreen" component={DeliveriesTab} />
    </Tab.Navigator>
  );

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName={'LandingScreen'}
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="LandingScreen" component={LandingScreen} />
        <Stack.Screen name="TabNavigation" component={TabNavigator} />
        <Stack.Screen
          options={{headerShown: true, presentation: 'modal'}}
          name="OrderDetailScreen"
          component={OrderDetailScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
