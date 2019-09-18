import { combineReducers } from 'redux'
import { reducer as homeReducer } from './Reducer/home'

const reducer = combineReducers({
  home: homeReducer,
});

export default reducer;
