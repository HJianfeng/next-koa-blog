import * as constants from './constants';

export const changeScrollFlag = (flag) => {
  return {
    type: constants.CHANGE_FLAG,
    flag
  };
};
