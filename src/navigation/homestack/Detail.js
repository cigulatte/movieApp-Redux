import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Likefill from '../../assets/icons/Likefill';
import Likeline from '../../assets/icons/Likeline';
import Loading from '../../components/Loading';
import * as actions from '../../redux/action';
import {ACTIVE_COLOR_TAB, MOVIE_INFO, MOVIE_DETAIL} from '../../utils/Colors';
import {
  DETAIL_LIKED_BUTTON_BOTTOM,
  DETAIL_LIKED_BUTTON_PADDING,
  DETAIL_LIKED_BUTTON_SIZE,
  HEIGHT,
  WIDTH,
} from '../../utils/Sizes';

const posterUrl = 'https://image.tmdb.org/t/p/original';

const Detail = ({
  action,
  route,
  loading,
  navigation,
  errorStatus,
  errorMessage,
  selectedMovie,
  selectedMovieCast,
  selectedMovieCrew,
}) => {
  const {id, liked, index} = route.params;

  const [crews, setCrews] = useState([]);
  const [casts, setCasts] = useState([]);

  const [detailLiked, setDetailLiked] = useState(liked);
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  useEffect(() => {
    setCrews(selectedMovieCrew.slice(0, 9));
  }, [selectedMovieCrew]);

  useEffect(() => {
    setCasts(selectedMovieCast.slice(0, 9));
  }, [selectedMovieCast]);

  const renderItemCast = useCallback(({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Text numberOfLines={1} style={{color: MOVIE_DETAIL}}>
          {item.name}
        </Text>
        <FastImage
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            backgroundColor: 'grey',
          }}
          source={{
            uri: item.profile_path ? posterUrl + item.profile_path : null,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  }, []);

  const renderItemCrew = useCallback(({item, index}) => {
    return (
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'flex-start',
        }}>
        <Text numberOfLines={1} style={{color: MOVIE_DETAIL}}>
          {item.name}
        </Text>
        <FastImage
          style={{
            width: 60,
            height: 60,
            borderRadius: 50,
            backgroundColor: 'grey',
          }}
          source={{
            uri: item.profile_path ? posterUrl + item.profile_path : null,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
      </View>
    );
  }, []);

  useEffect(() => {
    action.detailRequest(id);
    action.cast_and_crewRequest(id);
  }, [action, id]);

  const likeMethod = () => {
    action.liked(index, id);
    setDetailLiked(!detailLiked);
  };

  if (loading || !selectedMovie) return <Loading />;

  if (errorStatus)
    return (
      <View>
        <Text>{errorMessage}</Text>
      </View>
    );

  return (
    <View style={styles.container}>
      <View
        style={{
          height: HEIGHT / 3,
        }}>
        <FastImage
          style={{
            flex: 1,
            width: WIDTH,
            height: '100%',
            resizeMode: 'cover',
          }}
          source={{
            uri: posterUrl + selectedMovie.poster_path,
            priority: FastImage.priority.normal,
          }}
          resizeMode={FastImage.resizeMode.cover}
        />
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={likeMethod}
          style={{
            position: 'absolute',
            padding: DETAIL_LIKED_BUTTON_PADDING,
            bottom: -DETAIL_LIKED_BUTTON_BOTTOM,
            right: 10,
            backgroundColor: detailLiked ? ACTIVE_COLOR_TAB : 'grey',
            borderRadius: 50,
          }}>
          <Likefill
            color={'white'}
            width={DETAIL_LIKED_BUTTON_SIZE}
            height={DETAIL_LIKED_BUTTON_SIZE}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginVertical: DETAIL_LIKED_BUTTON_BOTTOM,
          marginHorizontal: DETAIL_LIKED_BUTTON_BOTTOM * 2,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text style={{fontWeight: '700', fontSize: 20}}>Duration</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          <Text style={{fontWeight: '700', fontSize: 20}}>Genre</Text>
        </View>
        <View style={{flex: 1, alignItems: 'flex-end'}}>
          <Text style={{fontWeight: '700', fontSize: 20}}>Language</Text>
        </View>
      </View>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          marginHorizontal: DETAIL_LIKED_BUTTON_BOTTOM * 2,
          justifyContent: 'space-around',
          alignItems: 'center',
        }}>
        <View style={{flex: 1, alignItems: 'flex-start'}}>
          <Text style={{color: MOVIE_DETAIL}}>{selectedMovie.runtime}</Text>
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          {selectedMovie.genres ? (
            selectedMovie.genres.length > 1 ? (
              <>
                <Text style={{color: MOVIE_DETAIL}}>
                  {selectedMovie.genres[0].name}/
                </Text>
                <Text style={{color: MOVIE_DETAIL}}>
                  {selectedMovie.genres[1].name}
                </Text>
              </>
            ) : (
              <Text>{selectedMovie.genres[0].name}</Text>
            )
          ) : null}
        </View>
        <View style={{flex: 1, alignItems: 'center'}}>
          {selectedMovie.spoken_languages ? (
            selectedMovie.spoken_languages.length > 0 ? (
              <Text style={{color: MOVIE_DETAIL}}>
                {selectedMovie.spoken_languages[0].name}
              </Text>
            ) : null
          ) : null}
        </View>
      </View>
      <View>
        <Text
          style={{
            marginHorizontal: DETAIL_LIKED_BUTTON_BOTTOM * 2,
            marginTop: 10,
            fontWeight: '700',
            fontSize: 18,
          }}>
          Synopsis
        </Text>
        <Text
          numberOfLines={3}
          style={{
            color: MOVIE_DETAIL,
            marginHorizontal: DETAIL_LIKED_BUTTON_BOTTOM * 2,
            marginTop: 5,
          }}>
          {selectedMovie.overview ? selectedMovie.overview : null}
        </Text>
      </View>
      <View style={{flex: 1, maxHeight: 300}}>
        <Text
          style={{
            marginHorizontal: DETAIL_LIKED_BUTTON_BOTTOM * 2,
            marginTop: 10,
            fontWeight: '700',
            fontSize: 18,
            marginBottom: 5,
          }}>
          Main cast
        </Text>
        <FlatList
          data={casts}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          numColumns={3}
          renderItem={renderItemCast}
        />
      </View>
      <View style={{flex: 1, maxHeight: 300, marginTop: 10}}>
        <Text
          style={{
            marginHorizontal: DETAIL_LIKED_BUTTON_BOTTOM * 2,
            marginTop: 10,
            marginBottom: 5,
            fontWeight: '700',
            fontSize: 18,
          }}>
          Main technical team
        </Text>
        <FlatList
          data={crews}
          showsVerticalScrollIndicator={false}
          keyExtractor={keyExtractor}
          numColumns={3}
          renderItem={renderItemCrew}
        />
      </View>
    </View>
  );
};

const mapStateToProps = (state, ownProps) => ({
  errorStatus: state.movieReducer.errorStatus,
  loading: state.movieReducer.loading,
  errorMessage: state.movieReducer.errorMessage,
  selectedMovie: state.movieReducer.selectedMovie,
  selectedMovieCast: state.movieReducer.selectedMovieCast,
  selectedMovieCrew: state.movieReducer.selectedMovieCrew,
  route: ownProps.route,
  navigation: ownProps.navigation,
});

const ActionCreators = Object.assign({}, actions);
const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Detail);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
