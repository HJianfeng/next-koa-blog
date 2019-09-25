import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import reducer from './reducer';

const exampleInitialState = { };
/* eslint-disable no-underscore-dangle */
const makeStore = (initialState = exampleInitialState) => {
  if (process.env.NODE_ENV !== 'production') {
    const composeEnhancers = typeof window !== 'undefined' ? (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose) : compose;
    return createStore(reducer, initialState, composeEnhancers(
      applyMiddleware(thunk),
    ));
  }
  return createStore(reducer, initialState, applyMiddleware(thunk));
};


export default makeStore;
