import { SET_AUTH } from "../context/constant";

export const authReducer = (state, action) => {
  const {
    type,
    payload: { isAuthenticated, user },
  } = action;
  switch (type) {
    case SET_AUTH:
      return { ...state, isAuthenticated, user, authLoading: false };
    default:
      return state;
  }
};
