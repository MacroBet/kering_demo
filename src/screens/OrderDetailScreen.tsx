import React from 'react';
import {Text, View} from 'react-native';
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
