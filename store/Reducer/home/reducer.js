import * as constants from './constants'

const defaultState = {
  subjects: {},
  current: 1,
  totalPages: 0,
  scrollFlag: true,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case constants.CHANGE_HOME_SUBJECTS:
      return Object.assign({}, state, {
        subjects: action.subjects,
      })
    case constants.CHANGE_CURRENT:
      return Object.assign({}, state, {
        current: action.current,
      })
    case constants.CHANGE_TOTAL:
      return Object.assign({}, state, {
        totalPages: action.pages,
      })
    case constants.CHANGE_FLAG:
      return Object.assign({}, state, {
        scrollFlag: action.flag,
      })
    default:
      return state;
  }
}
