import axios from 'axios';
import { setAlert } from './alert';
import {
  GET_POSTS,
  POST_ERROR,
  UPDATE_LIKES,
  ADD_POST,
  DELETE_POST,
} from './types';

// Get posts
export const getPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/v1/posts');

    dispatch({
      type: GET_POSTS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      msg: error.response.data.error,
      status: error.response.status,
    });
  }
};

// Add like
export const addLike = id => async dispatch => {
  try {
    const res = await axios.put(`/api/v1/posts/${id}/like`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data.data },
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.error, 'danger'));

    dispatch({
      type: POST_ERROR,
      msg: error.response.data.error,
      status: error.response.status,
    });
  }
};

// Remove like
export const removeLike = id => async dispatch => {
  try {
    const res = await axios.delete(`/api/v1/posts/${id}/like`);

    dispatch({
      type: UPDATE_LIKES,
      payload: { id, likes: res.data.data },
    });
  } catch (error) {
    dispatch(setAlert(error.response.data.error, 'danger'));

    dispatch({
      type: POST_ERROR,
      msg: error.response.data.error,
      status: error.response.status,
    });
  }
};

// Add post
export const addPost = formData => async dispatch => {
  try {
    const res = await axios.post('/api/v1/posts', formData);

    dispatch({
      type: ADD_POST,
      payload: res.data.data,
    });

    dispatch(setAlert('Post Created', 'success'));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      msg: error.response.data.error,
      status: error.response.status,
    });
  }
};

// Delete post
export const deletePost = id => async dispatch => {
  try {
    await axios.delete(`/api/v1/posts/${id}`);

    dispatch({
      type: DELETE_POST,
      payload: id,
    });

    dispatch(setAlert('Post Removed', 'success'));
  } catch (error) {
    dispatch({
      type: POST_ERROR,
      msg: error.response.data.error,
      status: error.response.status,
    });
  }
};
