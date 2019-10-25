import * as constants from './constants';
import { getMyUser } from '@/utils/api/user';

export const changeUserInfo = (user) => {
  return {
    type: constants.CHANGE_USER_INFO,
    user
  };
};

export const saveXtoken = (xtoken) => {
  return {
    type: constants.X_TOKEN,
    xtoken
  };
};


export const getUserInfoAction = () => {
  return async (dispatch) => {
    const { data } = await getMyUser();
    dispatch(changeUserInfo(data));
    return data;
  };
};
