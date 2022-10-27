import React, {useCallback, useMemo, useState} from 'react';
import {Button, FlatList, View} from 'react-native';
import {useSelector} from 'react-redux';
import {Row, Screen} from '../components';
import {HomeTabScreenProps} from '../navigation';
import {
  deleteOrders,
  mergeOrders,
  Order,
  pushOrder,
} from '../redux/demoReducer';
import {demoState} from '../redux/store';

export function OrdersScreen({navigation}: HomeTabScreenProps<'OrdersScreen'>) {
  const {orders} = useSelector(demoState);
  const [selectedOrders, setselectedOrders] = useState<string[]>([]);

  const toggleSelected = useCallback(
    (code: string) => {
      if (selectedOrders.includes(code)) {
        setselectedOrders(selectedOrders.filter(itm => itm !== code));
      } else {
        setselectedOrders(selectedOrders.concat([code]));
      }
    },
    [selectedOrders],
  );

  const renderItem = ({item}: {item: Order}) => {
    return (
      <Row
        title={item.code + ' - ' + item.type}
        selectable
        selected={selectedOrders.includes(item.code)}
        onSelectedChange={() => toggleSelected(item.code)}
        onPress={() => navigation.navigate('OrderDetailScreen', {order: item})}
      />
    );
  };

  const allSelected = useMemo(
    () => selectedOrders.length === orders.length,
    [selectedOrders, orders],
  );
  return (
    <Screen>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{flexDirection: 'row'}}>
          <Button
            title="Add"
            color={'green'}
            onPress={() =>
              pushOrder({
                code: String(Math.trunc(Math.random() * 10000)),
                type: Math.random() > 0.5 ? 'NEW' : 'OLD',
              })
            }
          />
          {selectedOrders.length > 0 && (
            <Button
              title="Delete"
              color={'red'}
              onPress={() => {
                deleteOrders(selectedOrders);
                setselectedOrders([]);
              }}
            />
          )}
          {selectedOrders.length > 1 && (
            <Button
              title="Merge"
              onPress={() => {
                mergeOrders(selectedOrders);
                setselectedOrders([]);
              }}
            />
          )}
        </View>
        {orders.length > 0 && (
          <Button
            title={allSelected ? 'Unselect All' : 'Select All'}
            onPress={() =>
              allSelected
                ? setselectedOrders([])
                : setselectedOrders(orders.map(itm => itm.code))
            }
          />
        )}
      </View>
      <FlatList
        data={orders}
        extraData={selectedOrders}
        renderItem={renderItem}
      />
    </Screen>
  );
}
