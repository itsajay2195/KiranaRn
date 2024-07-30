import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HOME_SCREEN, SPLASH_SCREEN} from './utils/screenConstants';
import SplashScreen from './screens/SplashScreen/SplashScreen';
import Homescreen from './screens/Homescreen/Homescreen';

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

export default RootNavigation;
