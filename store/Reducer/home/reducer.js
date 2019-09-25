import * as constants from './constants';

const defaultState = {
  scrollFlag: true
};

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_FLAG:
      return Object.assign({}, state, {
        scrollFlag: action.flag
      });
    default:
      return state;
  }
};
