import React from 'react';
import {FlatList} from 'react-native';
import {useSelector} from 'react-redux';
import {Row, Screen} from '../components';
import {HomeTabScreenProps} from '../navigation';
import {Delivery} from '../redux/demoReducer';
import {demoState} from '../redux/store';

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
