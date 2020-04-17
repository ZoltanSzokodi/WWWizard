import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, PROFILE_ERROR } from './types';
// import { loadUser } from './auth';

export const getCurrentProfile = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/profile/me');

    dispatch({
      type: GET_PROFILE,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.error,
        status: error.response.status,
      },
    });
  }
};
