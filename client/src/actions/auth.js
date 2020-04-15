import axios from 'axios';
import { setAlert } from './alert';
import setAuthToken from '../utils/setAuthToken';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_LOADED,
  AUTH_ERROR,
} from './types';

// Load user
export const loadUser = () => async dispatch => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  try {
    const res = await axios.get('/api/v1/auth');

    dispatch({
      type: USER_LOADED,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// Register user
export const register = ({ name, email, password }) => async dispatch => {
  const body = { name, email, password };
  try {
    const res = await axios.post('/api/v1/users/register', body);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data,
    });
  } catch (error) {
    const errors = error.response.data.error.split(',');

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err, 'danger')));
    }

    dispatch({
      type: REGISTER_FAIL,
    });
  }
};
