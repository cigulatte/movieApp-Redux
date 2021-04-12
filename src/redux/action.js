import {
  LOADING_STATUS,
  MOVIES_SUCCESS,
  MOVIE_DETAIL_SUCCESS,
  MOVIE_CAST_SUCCESS,
  GENRES_SUCCESS,
  NEW_PAGE,
  ERROR,
  LIKED,
  SEARCH,
} from './constants';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const main_url = 'http://api.themoviedb.org/3/movie/';
const trends_url = 'http://api.themoviedb.org/3/trending/movie/week';
const genres_url = 'http://api.themoviedb.org/3/genre/movie/list';
const api_key = 'xxx';
const headers = {
  'Content-Type': 'application/json',
};

let likes = [];

export const moviesRequest = (page) => {
  return async (dispatch) => {
    const likes_json = await AsyncStorage.getItem('likes');

    if (likes_json !== null) {
      likes = JSON.parse(likes_json);
    } else {
      await AsyncStorage.setItem('likes', JSON.stringify(likes));
    }
    dispatch({type: LOADING_STATUS, payload: true});
    axios
      .get(trends_url, {
        headers,
        params: {
          api_key,
          page,
        },
      })
      .then((response) => {
        dispatch({type: LOADING_STATUS, payload: false});

        dispatch({type: ERROR, payload: {status: false, message: ''}});

        const results = response.data.results;
        for (const element of results) {
          element.liked = false;
          likes.map((item) => {
            if (item === element.id) {
              element.liked = true;
            }
          });
        }
        dispatch({
          type: MOVIES_SUCCESS,
          payload: results,
          refreshing: false,
        });
      })
      .catch((error) => {
        dispatch({type: LOADING_STATUS, payload: false});
        dispatch({
          type: ERROR,
          payload: {status: true, message: error.status_message},
        });
      });
  };
};

export const genresRequest = () => {
  return (dispatch) => {
    dispatch({type: LOADING_STATUS, payload: true});
    axios
      .get(genres_url, {
        headers,
        params: {
          api_key,
        },
      })
      .then((response) => {
        dispatch({type: LOADING_STATUS, payload: false});

        dispatch({type: ERROR, payload: {status: false, message: ''}});

        dispatch({
          type: GENRES_SUCCESS,
          payload: response.data.genres,
          refreshing: false,
        });
      })
      .catch((error) => {
        dispatch({type: LOADING_STATUS, payload: false});
        dispatch({
          type: ERROR,
          payload: {status: true, message: error.status_message},
        });
      });
  };
};
export const detailRequest = (id) => {
  return (dispatch) => {
    dispatch({type: LOADING_STATUS, payload: true});
    axios
      .get(main_url + id, {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          api_key,
        },
      })
      .then((response) => {
        dispatch({type: LOADING_STATUS, payload: false});

        dispatch({type: ERROR, payload: {status: false, message: ''}});

        dispatch({
          type: MOVIE_DETAIL_SUCCESS,
          payload: response.data,
          refreshing: false,
        });
      })

      .catch((error) => {
        dispatch({type: LOADING_STATUS, payload: false});
        dispatch({
          type: ERROR,
          payload: {status: true, message: error.status_message},
        });
      });
  };
};

export const cast_and_crewRequest = (id) => {
  return (dispatch) => {
    dispatch({type: LOADING_STATUS, payload: true});
    axios
      .get(main_url + id + '/credits', {
        headers: {
          'Content-Type': 'application/json',
        },
        params: {
          api_key,
        },
      })
      .then((response) => {
        dispatch({type: LOADING_STATUS, payload: false});

        dispatch({type: ERROR, payload: {status: false, message: ''}});

        dispatch({
          type: MOVIE_CAST_SUCCESS,
          payload: response.data,
          refreshing: false,
        });
      })

      .catch((error) => {
        dispatch({type: LOADING_STATUS, payload: false});
        dispatch({
          type: ERROR,
          payload: {status: true, message: error.status_message},
        });
      });
  };
};

export const newPage = (page) => {
  return (dispatch) => {
    dispatch({type: NEW_PAGE, payload: page});
  };
};

export const liked = (movie_index, id) => {
  return async (dispatch) => {
    let likes_json = await AsyncStorage.getItem('likes');

    if (likes_json !== null) {
      likes = JSON.parse(likes_json);
    }
    const currentSize = likes.length;

    likes = likes.filter((item) => item !== id);

    if (currentSize === likes.length) {
      likes.push(id);
    }

    await AsyncStorage.setItem('likes', JSON.stringify(likes));
    //  console.log('likess ' + likes);

    dispatch({type: LIKED, payload: movie_index});
  };
};

export const search = (searchInput) => {
  return async (dispatch) => {
    //console.log('search input ' + searchInput);
    dispatch({type: SEARCH, payload: searchInput});
  };
};
