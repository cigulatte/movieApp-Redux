import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

import {createStackNavigator} from '@react-navigation/stack';
import Home from './Home';
import Detail from './Detail';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="main"
        component={Home}
        options={{
          title: 'Home',
        }}
      />
      <Stack.Screen
        name="detail"
        component={Detail}
        options={{
          title: 'Movie details',
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

const styles = StyleSheet.create({});
