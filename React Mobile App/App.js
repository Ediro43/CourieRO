import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { CreateAccountScreen } from './src/screens/CreateAccountScreen';
import { DeliveryScreen } from './src/screens/DeliveryScreen';
import { SignInScreen } from './src/screens/SignInScreen';
import { WelcomeScreen } from './src/screens/WelcomeScreen';
import { YourPackageScreen } from './src/screens/YourPackageScreen';

const AuthStack = createStackNavigator();

export default () => {
  <NavigationContainer>
    <AuthStack.Navigator>
      <AuthStack.Screen
        name="SignIn"
        component={SignInScreen}
      ></AuthStack.Screen>
      <AuthStack.Screen
        name="Register"
        component={CreateAccountScreen}
      ></AuthStack.Screen>
    </AuthStack.Navigator>
  </NavigationContainer>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
