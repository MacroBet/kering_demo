import {View, Text, FlatList, Button} from 'react-native';
import React, {useMemo} from 'react';
import {HomeTabScreenProps} from '../navigation';
// import {deleteDelivery, toggleDeliveryStatus} from '../redux/demoReducer';
import {Row, Screen} from '../components';
import {demoState} from '../redux/store';
import {useSelector} from 'react-redux';
import {useDemoStore} from '../zustand/rootZustand';
import {Order} from '../types';

export function DeliveryDetailScreen({
  navigation,
  route,
}: HomeTabScreenProps<'DeliveryDetailScreen'>) {
  const {deliveryId} = route.params;
  // const {deliveries} = useSelector(demoState);
  const {deliveries, deleteDelivery, toggleDeliveryStatus} = useDemoStore(
    state => state,
  );

  const delivery = deliveries.find(itm => itm.id === deliveryId);

  const renderItem = ({item}: {item: Order}) => {
    return (
      <Row
        title={item.code + ' - ' + item.type}
        onPress={() => navigation.navigate('OrderDetailScreen', {order: item})}
      />
    );
  };
  if (!delivery) return null;
  return (
    <Screen>
      <Text>{delivery.id}</Text>
      <Text style={{fontWeight: 'bold'}}>{delivery.status}</Text>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Button
          title="toggle status"
          onPress={() => toggleDeliveryStatus(delivery.id)}
        />
        <Button
          color={'red'}
          title="delete"
          onPress={() => {
            navigation.pop();
            deleteDelivery(delivery.id);
          }}
        />
      </View>
      <FlatList data={delivery.orders} renderItem={renderItem} />
    </Screen>
  );
}
