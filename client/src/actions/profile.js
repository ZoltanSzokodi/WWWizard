import axios from 'axios';
import { setAlert } from './alert';
import { GET_PROFILE, UPDATE_PROFILE, PROFILE_ERROR } from './types';
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

// Create or Update a Profile
export const createProfile = (
  formData,
  history,
  edit = false
) => async dispatch => {
  try {
    const res = await axios.post('/api/v1/profile', formData);

    dispatch({
      type: GET_PROFILE,
      payload: res.data.data,
    });

    dispatch(setAlert(edit ? 'Profile Updated' : 'Profile Created', 'success'));

    if (!edit) {
      history.push('/dashboard');
    }
  } catch (error) {
    const errors = error.response.data.error.split(',');

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.error,
        status: error.response.status,
      },
    });
  }
};

// Add Experience
export const addExperience = (formData, history) => async dispatch => {
  try {
    const res = await axios.put('/api/v1/profile/experience', formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data,
    });

    dispatch(setAlert('Experience Added', 'success'));

    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.error.split(',');

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.error,
        status: error.response.status,
      },
    });
  }
};

// Add Education
export const addEducation = (formData, history) => async dispatch => {
  try {
    const res = await axios.put('/api/v1/profile/education', formData);

    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data.data,
    });

    dispatch(setAlert('Education Added', 'success'));

    history.push('/dashboard');
  } catch (error) {
    const errors = error.response.data.error.split(',');

    if (errors) {
      errors.forEach(err => dispatch(setAlert(err, 'danger')));
    }

    dispatch({
      type: PROFILE_ERROR,
      payload: {
        msg: error.response.data.error,
        status: error.response.status,
      },
    });
  }
};
