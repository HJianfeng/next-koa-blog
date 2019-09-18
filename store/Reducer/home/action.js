import axios from '../../../utils/axios';
import * as constants from './constants'

export const changeSubjects = (subjects, isInit) => {
  return {
    type: constants.CHANGE_HOME_SUBJECTS,
    subjects,
    isInit,
  }
}
export const changeCurrent = (current) => {
  return {
    type: constants.CHANGE_CURRENT,
    current,
  }
}
const changeTotalPages = (pages) => {
  return {
    type: constants.CHANGE_TOTAL,
    pages,
  }
}
const changeScrollFlag = (flag) => {
  return {
    type: constants.CHANGE_FLAG,
    flag,
  }
}

export const getSubjetcs = (keyword) => {
  return async (dispatch, getState) => {
    const {
      current, scrollFlag, subjects,
    } = getState().home
    const params = {
      pageNum: current,
      keyword: keyword || '1',
    }
    if ((scrollFlag || scrollFlag === undefined) && current < 30) {
      dispatch(changeScrollFlag(false))
      const res = await axios.get('/subject', { params })
      const { data } = res
      if (data.code === 200 && data.data.subject) {
        dispatch(changeCurrent(params.pageNum + 1))
        dispatch(changeTotalPages(data.data.subject.pages))
        dispatch(changeScrollFlag(true))
        if (current > 1) {
          const newsub = subjects.data.subject.records.concat(data.data.subject.records)
          data.data.subject.records = newsub
        }
        return dispatch(changeSubjects(data))
      }
      return dispatch(changeSubjects(subjects))
    }
    return null;
  }
}
