import * as constants from './constants';

const defaultState = {
  userInfo: {},
  xtoken: ''
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.user
      });
    case constants.X_TOKEN:
      return Object.assign({}, state, {
        xtoken: action.xtoken
      });
    default:
      return state;
  }
};
