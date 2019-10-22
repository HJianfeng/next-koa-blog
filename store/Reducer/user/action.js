import * as constants from './constants';

export const changeUserInfo = (user) => {
  return {
    type: constants.CHANGE_USER_INFO,
    user
  };
};
