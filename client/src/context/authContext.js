import { useReducer, createContext, useEffect } from "react";
import axios from "axios";

import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN } from "./constant";
import setAuthToken from "../utils/setAuthToken";

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
      const response = axios.get(`${apiUrl}/auth`);
      if (response.data.success) {
        dispatch({
          type: "SET_AUTH",
          payload: { isAuthenticated: true, user: response.data.user },
        });
      }
    } catch (error) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN);
      setAuthToken(null);
      dispatch({
        type: "SET_AUTH",
        payload: {
          isAuthenticated: false,
          user: null,
        },
      });
    }
  };

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
        return response.data;
      }
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };

  // context data, pass this function as global value, that all route can reach
  const authContextData = { logInUser, authState };

  // return , pass dataContext to let all children can access if the children useContext(AuthContext)
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
