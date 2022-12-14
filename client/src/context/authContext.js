import { useReducer, createContext, useEffect } from "react";
import axios from "axios";

import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN } from "./constant";
import setAuthToken from "../utils/setAuthToken";
import { SET_AUTH } from "../context/constant";

// create context to server global state,export to let the children use useContext(authContext) to
// be able to see value  that is passed to the authContext
export const AuthContext = createContext();

// create the highest level component that contains the context
// and global sate
const AuthContextProvider = ({ children }) => {
  // use useReducer to init global state and dispatch function to dispatch the action
  // that will be go in to authReducer then return the new authState
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  // Authenticate user, if token is exist in the local storage, set it the the default header of all request
  const loadUser = async () => {
    if (localStorage[LOCAL_STORAGE_TOKEN]) {
      setAuthToken(localStorage[LOCAL_STORAGE_TOKEN]);
    }
    try {
      // send the get request to server to authenticate
      // the access token in the local storage is valid or not
      // this function to care about when user logged in then reload the page or user come back when close browser
      // to check whether user logged or not, event user not request to change data, we still authenticate user
      const response = await axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        // if the token valid, dispatch action to change
        // the global state(auth context)
        dispatch({
          type: SET_AUTH,
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      // when user reload the page we will always check whether the token is valid or not
      // if the token is invalid(this will let server return the error, we will remove that token from local storage)
      // if the token not valid from server
      // remove that token from local storage
      // and set the authContext to the init state
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
      // reset the default header key Authorization to null
      setAuthToken(null);
      // change the global state
      dispatch({
        type: SET_AUTH,
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

  // useEffect to call loadUser function every time the AuthContextProvider
  // is mounted to DOM
  // this will make always authenticate user when user reload the page
  useEffect(() => {
    loadUser();
  }, []);

  // login
  const logInUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/login`, userForm);
      // server response a json, if success is true, store the access token in local_storage
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken);
        // when login successfully, we authenticate the token with server , then dispatch to change the context
        await loadUser();
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(`${apiUrl}/auth/register`, userForm);
      // server response a json, if success is true, store the access token in local_storage
      if (response.data.success) {
        localStorage.setItem(LOCAL_STORAGE_TOKEN, response.data.accessToken);
        // when login successfully, we authenticate the token with server , then dispatch to change the context
        await loadUser();
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  const logOutUser = () => {
    // logic is same with the codes inside catch function when loadUser() but the token is wrong or out of date
    // remove that token from local storage and set the header key Authorization to null
    localStorage.removeItem(LOCAL_STORAGE_TOKEN);
    //  dispatch to change context
    dispatch({
      type: SET_AUTH,
      payload: {
        isAuthenticated: false,
        user: null,
      },
    });
  };

  // context data, pass this function as global value, that all route can reach
  const authContextData = { logInUser, authState, registerUser, logOutUser };

  // return , pass dataContext to let all children can access if the children useContext(AuthContext)
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
