import {createStore, combineReducers} from 'redux';
import movieReducer from './reducer';
import {applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
const rootReducer = combineReducers({movieReducer: movieReducer});
const configureStore = () => {
  return createStore(rootReducer, applyMiddleware(thunk));
};
export default configureStore;
