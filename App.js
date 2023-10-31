import 'react-native-gesture-handler'
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import COLORS from '../my-app/consts/colors'
import DetailsScreen from './screens/DetailsScreen'
import BottomNavigator from './screens/BottomNavigator'
import OnBoardScreen from './screens/OnBoardScreen'
import Login from './screens/Login'
import Signup from './screens/Signup'
import { StatusBar } from 'expo-status-bar';
import ProfileScreen from './screens/ProfileScreen';
import Payment from './screens/Payment'

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.white} barStyle="dark-content" />
      <Stack.Navigator
        screenOptions={{headerShown: false}}
      >
        <Stack.Screen name="BoardScreen" component={OnBoardScreen} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="DetailsScreen" component={DetailsScreen} />
        <Stack.Screen name="HomeScreen" component={BottomNavigator} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="PaymentScreen" component={Payment} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
