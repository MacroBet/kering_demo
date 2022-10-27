import React from 'react';
import {StatusBar, StyleProp, View, ViewStyle} from 'react-native';

export interface ScreenProps {
  statusBackgroundColor?: string;
  noTopbar?: boolean;
  topBarChildren?: React.ReactNode;
  noRestaurantName?: boolean;
  padded?: boolean;
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

export function Screen({children, statusBackgroundColor, style}: ScreenProps) {
  return (
    <View style={[{flex: 1, marginTop: 10}, style]}>
      <View style={{flex: 1, paddingHorizontal: 10}}>{children}</View>
    </View>
  );
}
