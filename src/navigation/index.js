import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Profile from './Profile';
import HomeStack from './homestack';
import Homefill from '../assets/icons/Homefill';
import Homeline from '../assets/icons/Homeline';
import Userfill from '../assets/icons/Userfill';
import Userline from '../assets/icons/Userline';
import {ACTIVE_COLOR_TAB, INACTIVE_COLOR_TAB} from '../utils/Colors';

const Tab = createBottomTabNavigator();

const MainNavigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarInactiveTintColor: INACTIVE_COLOR_TAB,
          tabBarActiveTintColor: ACTIVE_COLOR_TAB,

          tabBarIcon: ({focused, size, color}) => {
            if (route.name === 'Home') {
              return focused ? (
                <Homefill color={color} width={size} height={size} />
              ) : (
                <Homeline color={color} width={size} height={size} />
              );
            } else if (route.name === 'Profile') {
              return focused ? (
                <Userfill color={color} width={size} height={size} />
              ) : (
                <Userline color={color} width={size} height={size} />
              );
            }
          },
        })}>
        <Tab.Screen
          options={{
            headerShown: false,
          }}
          name="Home"
          component={HomeStack}
        />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
