import {View, Text} from 'react-native';
import React from 'react';
import {RootStackScreenProps} from '../navigation';

export function OrderDetailScreen({
  navigation,
  route,
}: RootStackScreenProps<'OrderDetailScreen'>) {
  const {order} = route.params;
  return (
    <View>
      <Text>{order.code}</Text>
      <Text>{order.type}</Text>
    </View>
  );
}
