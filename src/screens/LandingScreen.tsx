import React from 'react';
import {Button} from 'react-native';
import {Screen} from '../components';
import {RootStackScreenProps} from '../navigation';

export function LandingScreen({
  navigation,
}: RootStackScreenProps<'LandingScreen'>) {
  return (
    <Screen>
      <Button
        onPress={() => navigation.navigate('TabNavigation')}
        title="Open Demo"
      />
    </Screen>
  );
}
