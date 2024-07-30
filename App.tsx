/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {Colors} from 'react-native/Libraries/NewAppScreen';

import appstore from './src/redux/appstore';
import {Provider} from 'react-redux';
import {realmConfig} from './src/realm';
import {RealmProvider} from '@realm/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import RootNavigation from './src/RootNavigation';

function App(): React.JSX.Element {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <Provider store={appstore}>
      <GestureHandlerRootView style={styles.flex1}>
        <SafeAreaView style={styles.flex1}>
          <RealmProvider {...realmConfig}>
            <RootNavigation />
          </RealmProvider>
        </SafeAreaView>
      </GestureHandlerRootView>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  flex1: {
    flex: 1,
  },
});

export default App;
