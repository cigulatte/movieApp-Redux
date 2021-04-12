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
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  GRID_CARD_HEIGHT,
  GRID_CARD_WIDTH,
  WIDTH,
} from '../utils/Sizes';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as actions from '../redux/action';
import Loading from './Loading';

const posterUrl = 'https://image.tmdb.org/t/p/original';

const MovieItem = ({
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

  const renderItem = useCallback(
    ({item, index}) => {
      return item.title.toLowerCase().includes(searchInput.toLowerCase()) ? (
        <TouchableOpacity
          onPress={() => navigate(item.id, item.liked, index)}
          activeOpacity={0.9}
          style={{flex: 1, flexDirection: 'row', margin: 5}}>
          <View>
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
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              margin: 5,
              flex: 1,
            }}>
            <View style={{flex: 1}}>
              <Text style={styles.title} numberOfLines={2} ellipsizeMode="tail">
                {item.title}
              </Text>

              <Text
                style={{
                  margin: 5,
                  color: MOVIE_INFO,
                  fontWeight: '700',
                  fontSize: 18,
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
                          <Text key={ind} style={styles.info}>
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
            <View style={{margin: 5}}>
              <Text style={styles.info}>{item.vote_average}</Text>
              <Text style={styles.info}>Public</Text>
            </View>
          </View>
        </TouchableOpacity>
      ) : null;
    },
    [genres, navigate, action, searchInput],
  );

  const sendRequestAgain = () => {
    action.moviesRequest(page);
  };
  const onEndReachedRequest = () => {
    if (searchInput === '') {
      action.newPage(page + 1);
      setRequestAgain(true);
    }
  };

  return (
    <FlatList
      data={movieList}
      showsVerticalScrollIndicator={false}
      keyExtractor={keyExtractor}
      onEndReached={onEndReachedRequest}
      onEndReachedThreshold={0.1}
      numColumns={1}
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

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);

const styles = StyleSheet.create({
  image: {
    flex: 1,
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    borderRadius: 15,
    backgroundColor: 'grey',
  },
  info: {
    color: MOVIE_INFO,
    fontWeight: '700',
    fontSize: 16,
  },
  title: {
    color: 'black',
    fontWeight: '700',
    fontSize: 18,
    marginHorizontal: 5,
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
