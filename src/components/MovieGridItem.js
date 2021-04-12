import React, {useCallback} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import FastImage from 'react-native-fast-image';

import Likefill from '../assets/icons/Likefill';
import Likeline from '../assets/icons/Likeline';
import {ACTIVE_COLOR_TAB, MOVIE_INFO} from '../utils/Colors';
import {GRID_CARD_HEIGHT, GRID_CARD_WIDTH, WIDTH} from '../utils/Sizes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/action';
import Loading from './Loading';

const posterUrl = 'https://image.tmdb.org/t/p/original';

const MovieGridItem = ({
  action,
  loading,
  movieList,
  errorMessage,
  errorStatus,
  page,
  genres,
  setRequestAgain,
  navigate,
  searchInput,
}) => {
  const keyExtractor = useCallback((item) => item.id.toString(), []);

  const onEndReachedRequest = () => {
    if (searchInput === '') {
      action.newPage(page + 1);
      setRequestAgain(true);
    }
  };

  const renderItem = useCallback(
    ({item, index}) => {
      return item.title.toLowerCase().includes(searchInput.toLowerCase()) ? (
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigate(item.id, item.liked, index)}
          style={{
            flex: 1,
            margin: 5,
            width: GRID_CARD_WIDTH,
          }}>
          <View
            style={{
              flex: 1,
              borderRadius: 15,
              backgroundColor: 'grey',
            }}>
            <FastImage
              style={styles.image}
              source={{
                uri: posterUrl + item.poster_path,
                priority: FastImage.priority.normal,
              }}
              resizeMode={FastImage.resizeMode.cover}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => action.liked(index, item.id)}
              style={styles.like_button}>
              {item.liked ? (
                <Likefill color={ACTIVE_COLOR_TAB} width={24} height={24} />
              ) : (
                <Likeline color={'white'} width={24} height={24} />
              )}
            </TouchableOpacity>
            <View
              style={{
                position: 'absolute',
                bottom: 3,
                left: 3,
                margin: 5,
              }}>
              <Text style={{color: 'white', fontWeight: '700', fontSize: 18}}>
                {item.title}
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                margin: 5,
                color: MOVIE_INFO,
                fontWeight: '700',
                fontSize: 16,
              }}>
              {item.release_date.split('-')[0]} | {item.original_language}
            </Text>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginHorizontal: 5,
              }}>
              {item.genre_ids.map((genre_id, current_index) => {
                if (current_index < 2) {
                  return genres.map((genre_item, ind) => {
                    if (genre_item.id === genre_id) {
                      return (
                        <Text
                          key={ind}
                          style={{
                            color: MOVIE_INFO,
                            fontWeight: '700',
                            fontSize: 16,
                          }}>
                          {current_index === 1 ? '/' : ''}
                          {genres[ind].name}
                        </Text>
                      );
                    }
                  });
                }
              })}
            </View>
          </View>
        </TouchableOpacity>
      ) : null;
    },
    [genres, navigate, action, searchInput],
  );

  return (
    <FlatList
      data={movieList}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      onEndReached={onEndReachedRequest}
      onEndReachedThreshold={0.1}
      numColumns={2}
      ListFooterComponent={searchInput === '' ? Loading : null}
      renderItem={renderItem}
    />
  );
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.movieReducer.loading,
  movieList: state.movieReducer.movieList,
  errorStatus: state.movieReducer.errorStatus,
  errorMessage: state.movieReducer.errorMessage,
  page: state.movieReducer.page,
  genres: state.movieReducer.genres,
  searchInput: state.movieReducer.searchInput,
  setRequestAgain: ownProps.setRequestAgain,
  navigate: ownProps.navigate,
});

const ActionCreators = Object.assign({}, actions);
const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieGridItem);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    height: GRID_CARD_HEIGHT,
    borderRadius: 15,
    backgroundColor: 'grey',
  },
  like_button: {
    borderColor: 'white',
    position: 'absolute',
    right: 5,
    top: 5,
    margin: 5,
    padding: 3,
    borderRadius: 50,
    borderWidth: 2,
  },
});
