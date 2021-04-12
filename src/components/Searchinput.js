import React, {useEffect, useState} from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Searchline from '../assets/icons/Searchline';
import {SEARCH_BACKGROUND, SEARCH_INLINE} from '../utils/Colors';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/action';

const Searchinput = ({action}) => {
  const [text, onChangeText] = useState('');

  useEffect(() => {
    if (text === '') {
      //console.log('text bos , ' + text);
      action.search(text);
    }
  }, [text, action]);

  const search = () => {
    //  console.log('text ' + text);
    action.search(text);
  };

  return (
    <View style={{display: 'flex', flexDirection: 'row'}}>
      <View style={styles.input_container}>
        <TouchableOpacity style={styles.search_container} onPress={search}>
          <Searchline width={24} height={24} color={SEARCH_INLINE} />
        </TouchableOpacity>
        <TextInput
          placeholder="Search"
          style={styles.input}
          keyboardType="twitter"
          onChangeText={onChangeText}
          value={text}
        />
      </View>
    </View>
  );
};

const ActionCreators = Object.assign({}, actions);
const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(ActionCreators, dispatch),
});

export default connect(null, mapDispatchToProps)(Searchinput);

const styles = StyleSheet.create({
  input_container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    borderRadius: 12,
    borderWidth: 1,
    padding: 2,
    margin: 10,
    backgroundColor: SEARCH_BACKGROUND,
    borderColor: SEARCH_BACKGROUND,
  },
  input: {
    flex: 8,
    padding: 5,
    color: 'black',
  },
  search_container: {
    flex: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
