import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
// The thunk middleware provides the ability for a function creator to return a dispatch function instead an action object
import thunk from 'redux-thunk';
import rootReducer from './reducers/index';

const initialState = {};

const middleware = [thunk];

const store = createStore(
  rootReducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

// set up a store subscription listener
// to store the users token in localStorage
let currentState = { auth: { token: null } };

store.subscribe(() => {
  // keep track of the previous and current state to compare changes
  let previousState = currentState;
  currentState = store.getState();
  // if the token changes set the value in localStorage
  if (previousState && previousState.auth.token !== currentState.auth.token) {
    const token = currentState.auth.token;
    token
      ? localStorage.setItem('token', token)
      : localStorage.removeItem('token');
  }
});

export default store;
