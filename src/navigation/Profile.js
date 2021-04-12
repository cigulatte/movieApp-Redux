import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/action';
import {MOVIE_INFO} from '../utils/Colors';
import FastImage from 'react-native-fast-image';

const Profile = ({userInformation, navigate}) => {
  return (
    <View style={styles.container}>
      <FastImage
        style={{width: 100, height: 100, borderRadius: 50, margin: 10}}
        source={{
          uri: userInformation.profilePicture,
          priority: FastImage.priority.normal,
        }}
        resizeMode={FastImage.resizeMode.cover}
      />
      <Text style={{fontSize: 24, fontWeight: '700', margin: 10}}>
        {userInformation.username}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: '600', fontSize: 18}}>Following</Text>
          <Text style={{fontWeight: '500', fontSize: 12, color: 'grey'}}>
            {userInformation.following}
          </Text>
        </View>
        <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{fontWeight: '600', fontSize: 18}}>Followers</Text>
          <Text style={{fontWeight: '500', fontSize: 12, color: 'grey'}}>
            {userInformation.followers}
          </Text>
        </View>
      </View>
    </View>
  );
};

const mapStateToProps = (state, ownProps) => ({
  userInformation: state.movieReducer.userInformation,
  navigate: ownProps.navigate,
});

export default connect(mapStateToProps, null)(Profile);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});
