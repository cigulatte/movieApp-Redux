import React from 'react';
import {ActivityIndicator, StyleSheet, Text, View} from 'react-native';
import {WIDTH} from '../utils/Sizes';

const Loading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  container: {
    width: WIDTH,
    height: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
