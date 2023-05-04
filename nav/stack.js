import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import Entry from '../screens/Entry';
import Home from '../screens/Home';

const Stack = createNativeStackNavigator();

const StackScreen = () => {
  return (
    <Stack.Navigator initialRouteName='Entry'>
        <Stack.Screen options={{ headerShown: false }} name='Entry' component={Entry} />
        <Stack.Screen options={{ headerShown: false }} name='Login' component={Login}  />
        <Stack.Screen options={{ headerShown: false }} name='Signup' component={Signup} />
        <Stack.Screen options={{ headerShown: false }} name='Home' component={Home} />
      </Stack.Navigator>
  )
}

export default StackScreen

const styles = StyleSheet.create({})