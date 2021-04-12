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

import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Likefill from '../assets/icons/Likefill';
import Likeline from '../assets/icons/Likeline';
import * as actions from '../redux/action';
import {
  ACTIVE_COLOR_TAB,
  INACTIVE_COLOR_TAB,
  MOVIE_INFO,
} from '../utils/Colors';
import {
  CARD_HEIGHT,
  CARD_WIDTH,
  GRID_CARD_HEIGHT,
  GRID_CARD_WIDTH,
} from '../utils/Sizes';
import MovieGridItem from './MovieGridItem';
import MovieItem from './MovieItem';

const Movies = ({
  action,
  loading,
  movieList,
  errorMessage,
  errorStatus,
  page,
  genres,
  grid,
  navigation,
}) => {
  const [requestAgain, setRequestAgain] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    action.genresRequest();
  }, [action]);

  useEffect(() => {
    if (requestAgain) {
      action.moviesRequest(page);
      setRequestAgain(false);
    }
  }, [action, page, requestAgain]);

  const sendRequestAgain = () => {
    action.moviesRequest(page);
  };

  if (errorStatus) {
    action.newPage(1);
    return (
      <View>
        <Text>{errorMessage}</Text>
        <TouchableOpacity onPress={sendRequestAgain}>
          <Text>TRY AGAIN</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const navigate = (id, liked, index) => {
    navigation.navigate('detail', {id: id, liked: liked, index: index});
  };

  return (
    <View style={styles.container}>
      {grid ? (
        <MovieGridItem setRequestAgain={setRequestAgain} navigate={navigate} />
      ) : (
        <MovieItem setRequestAgain={setRequestAgain} navigate={navigate} />
      )}
    </View>
  );
};

const mapStateToProps = (state, ownProps) => ({
  loading: state.movieReducer.loading,
  movieList: state.movieReducer.movieList,
  errorStatus: state.movieReducer.errorStatus,
  errorMessage: state.movieReducer.errorMessage,
  page: state.movieReducer.page,
  genres: state.movieReducer.genres,
  grid: ownProps.grid,
  navigation: ownProps.navigation,
});

const ActionCreators = Object.assign({}, actions);
const mapDispatchToProps = (dispatch) => ({
  action: bindActionCreators(ActionCreators, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Movies);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
