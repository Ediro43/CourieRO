import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DeliveryScreen } from './src/screens/DeliveryScreen/DeliveryScreen';
import { SignInScreen } from './src/screens/SignInScreen/SignInScreen';
import { WelcomeScreen } from './src/screens/WelcomeScreen/WelcomeScreen';
import { YourPackageScreen } from './src/screens/YourPackageScreen/YourPackageScreen';
import { InsertCodeScreen } from './src/screens/InsertCodeScreen/InsertCodeScreen';
import { ChangePackageStateScreen } from './src/screens/ChangePackageStateScreen/ChangePackageStateScreen';
import { LogBox } from 'react-native';

const AuthStack = createStackNavigator();
LogBox.ignoreAllLogs();
export default () => (
  <NavigationContainer>
    <AuthStack.Navigator
      screenOptions={{ headerShown: false, animationEnabled: false }}
    >
      <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <AuthStack.Screen name="SignIn" component={SignInScreen} />
      <AuthStack.Screen
        name="YourPackageScreen"
        component={YourPackageScreen}
      />
      <AuthStack.Screen name="DeliveryScreen" component={DeliveryScreen} />
      <AuthStack.Screen name="InsertCode" component={InsertCodeScreen} />
      <AuthStack.Screen
        name="ChangePackageState"
        component={ChangePackageStateScreen}
      />
    </AuthStack.Navigator>
  </NavigationContainer>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
