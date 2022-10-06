export const apiUrl =
  process.env.NODE_ENV !== "production"
    ? "https://immense-garden-47046.herokuapp.com/api"
    : "";
export const LOCAL_STORAGE_TOKEN = "learnit_mern";

export const SET_AUTH = "SET_AUTH";

export const POST_LOADED_SUCCESS = "POSTS_LOADED_SUCCESS";
export const POST_LOADED_FAIL = "POSTS_LOADED_FAIL";
export const ADD_POST = "ADD_POST";
export const DELETE_POST = "DELETE_POST";
export const UPDATE_POST = "UPDATE_POST";
export const FIND_POST = "FIND_POST";
