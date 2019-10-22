import * as constants from './constants';

const defaultState = {
  userInfo: {}
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_USER_INFO:
      return Object.assign({}, state, {
        userInfo: action.user
      });
    default:
      return state;
  }
};
