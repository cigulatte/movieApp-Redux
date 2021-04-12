import {
  MOVIES_SUCCESS,
  MOVIE_DETAIL_SUCCESS,
  ERROR,
  LOADING_STATUS,
  NEW_PAGE,
  GENRES_SUCCESS,
  MOVIE_CAST_SUCCESS,
  LIKED,
  SEARCH,
} from './constants';

const initialState = {
  movieList: [],
  page: 1,
  genres: [],
  loading: false,
  errorStatus: false,
  errorMessage: '',
  userInformation: {
    username: 'gicky',
    following: 123,
    followers: 100,
    profilePicture:
      'https://i4.hurimg.com/i/hurriyet/75/750x422/5660039ec03c0e4d20340b41.jpg',
  },
  selectedMovie: {},
  selectedMovieCast: [],
  selectedMovieCrew: [],
  searchInput: '',
};
const movieReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH:
      return {
        ...state,
        searchInput: action.payload,
      };
    case LIKED:
      return {
        ...state,
        movieList: state.movieList.map((item, index) =>
          index === action.payload ? {...item, liked: !item.liked} : item,
        ),
      };
    case NEW_PAGE:
      return {
        ...state,
        page: action.payload,
      };
    case GENRES_SUCCESS:
      return {
        ...state,
        genres: action.payload,
      };
    case MOVIES_SUCCESS:
      return {
        ...state,
        movieList: [...state.movieList, ...action.payload],
      };
    case MOVIE_DETAIL_SUCCESS:
      return {
        ...state,
        selectedMovie: action.payload,
      };
    case MOVIE_CAST_SUCCESS:
      return {
        ...state,
        selectedMovieCast: action.payload.cast,
        selectedMovieCrew: action.payload.crew,
      };
    case ERROR:
      return {
        ...state,
        errorStatus: action.payload.status,
        errorMessage: action.payload.message,
      };
    case LOADING_STATUS:
      return {
        ...state,
        loading: action.payload,
      };

    default:
      return state;
  }
};
export default movieReducer;
