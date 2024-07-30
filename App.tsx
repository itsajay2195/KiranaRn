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
import Homescreen from './src/screens/Homescreen/Homescreen';
import {realmConfig} from './src/realm';
import {News} from './src/realm/models/NewsSchema';
import {RealmProvider} from '@realm/react';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import SplashScreen from './src/screens/SplashScreen/SplashScreen';
import {NavigationContainer} from '@react-navigation/native';
import {HOME_SCREEN, SPLASH_SCREEN} from './src/utils/screenConstants';

const Stack = createNativeStackNavigator();
const RootNavigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={SPLASH_SCREEN}>
        <Stack.Screen
          name={SPLASH_SCREEN}
          component={SplashScreen}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name={HOME_SCREEN}
          component={Homescreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

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
