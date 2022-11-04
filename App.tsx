import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useEffect} from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';
import {AppNavigator} from './src/navigation/Navigator';
import {quickStart} from './src/RealmExample';
import {persistor, store} from './src/redux/store';

quickStart().catch(error => {
  console.log(`An error occurred: ${error}`);
});

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  // useEffect(() => {
  //   AsyncStorage.clear().then(() => {
  //     console.log('pulito');
  //   });
  // }, []);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppNavigator />
        </PersistGate>
      </Provider>
    </SafeAreaView>
  );
};

export default App;
