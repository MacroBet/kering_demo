import {View, Text, Button, FlatList} from 'react-native';
import React, {useCallback, useMemo, useState} from 'react';
import {useSelector} from 'react-redux';
import {demoState} from '../redux/store';
import {deleteOrders, Delivery, Order, pushOrder} from '../redux/demoReducer';
import {Row, Screen} from '../components';
import {HomeTabScreenProps} from '../navigation';

export function DeliveriesScreen({
  navigation,
}: HomeTabScreenProps<'DeliveriesScreen'>) {
  const {deliveries} = useSelector(demoState);

  const renderItem = ({item}: {item: Delivery}) => {
    return (
      <Row
        title={item.id + ' - ' + item.status}
        onPress={() =>
          navigation.navigate('DeliveryDetailScreen', {deliveryId: item.id})
        }
      />
    );
  };

  return (
    <Screen>
      <FlatList data={deliveries} renderItem={renderItem} />
    </Screen>
  );
}
