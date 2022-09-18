import {
  POST_LOADED_FAIL,
  POST_LOADED_SUCCESS,
  ADD_POST,
  DELETE_POST,
} from "../context/constant";

export const postReducer = (state, action) => {
  const { type, payload } = action;
  switch (type) {
    case POST_LOADED_SUCCESS: {
      return { ...state, posts: payload, postLoading: false };
    }
    case POST_LOADED_FAIL: {
      return { ...state, posts: [], postLoading: false };
    }
    case ADD_POST: {
      return { ...state, posts: [...state.posts, payload] };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((post) => post._id !== payload),
      };
    }
    default:
      return state;
  }
};
