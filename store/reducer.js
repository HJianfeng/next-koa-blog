import { combineReducers } from 'redux';
import { reducer as homeReducer } from './Reducer/home';
import { reducer as userReducer } from './Reducer/user';

const reducer = combineReducers({
  home: homeReducer,
  user: userReducer
});

export default reducer;
