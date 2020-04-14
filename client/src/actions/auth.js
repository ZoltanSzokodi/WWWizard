import axios from 'axios';
import { setAlert } from './alert';
import { REGISTER_FAIL, REGISTER_SUCCESS } from './types';

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
