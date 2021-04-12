import React, {useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Grid from '../../assets/icons/Grid';
import List from '../../assets/icons/List';
import Movies from '../../components/Movies';
import Searchinput from '../../components/Searchinput';

const Home = ({navigation}) => {
  const [grid, setGrid] = useState(true);

  return (
    <View style={styles.container}>
      <Searchinput />
      <View style={styles.list_Header}>
        <Text style={styles.header_Title}>Most Popular</Text>
        <TouchableOpacity
          style={styles.header_Button}
          onPress={() => setGrid(!grid)}>
          {grid ? (
            <Grid width={32} height={32} />
          ) : (
            <List width={32} height={32} />
          )}
        </TouchableOpacity>
      </View>
      {/**
       * <TouchableOpacity
        onPress={() => navigation.navigate('detail', {id: 123})}>
        <Text>go detail</Text>
      </TouchableOpacity>*/}
      <Movies grid={grid} navigation={navigation} />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  list_Header: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  header_Button: {margin: 5, padding: 5},
  header_Title: {fontWeight: '700', fontSize: 22, margin: 5},
});
