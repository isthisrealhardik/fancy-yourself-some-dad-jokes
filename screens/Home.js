import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Favorite from './Fav';
import Main from './Main';
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

const Home = () => {
  return (
    <Tab.Navigator>
        <Tab.Screen 
            name='Main' 
            component={Main} 
            options={{ 
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Icon name="home-outline" color={color} size={size} />
                  )
                }} 
        />
        <Tab.Screen 
            name='Fav' 
            component={Favorite} 
            options={{
                headerShown: false,
                tabBarIcon: ({ color, size }) => (
                    <Icon name="heart-outline" color={color} size={size} />
                  )
            }} 
        />
    </Tab.Navigator>
  )
}

export default Home

const styles = StyleSheet.create({})