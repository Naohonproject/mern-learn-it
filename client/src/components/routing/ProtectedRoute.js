import { Navigate } from "react-router-dom";
import { useContext } from "react";

import { AuthContext } from "../../context/authContext";
import Spinner from "react-bootstrap/esm/Spinner";
import NavbarMenu from "../auth/NavbarMenu";

// HOC
const ProtectedRoute = ({ component: Component, ...rest }) => {
  // use context to recognize that user logged in or not,this will dedicate how dashboard
  // is render base on the context

  const {
    authState: { isAuthenticated, authLoading },
  } = useContext(AuthContext);
  // if authLoading, render the dashboard such the Spinner
  if (authLoading) {
    return (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  }
  // if isAuthenticated is true, render DashBoard, else navigate that to the login page
  //  because this bases on isAuthenticated, so that, right after login successfully, if we not call  loadUser();
  // isAuthenticated still false , so that we need to call loadUser() right after log in , before navigate("/dashboard")
  // or we call await loadUser right inside loginUser() after setItem to local storage
  return isAuthenticated ? (
    <>
      <NavbarMenu />
      <Component {...rest} />
    </>
  ) : (
    <Navigate to="/login" />
  );
};

export default ProtectedRoute;
