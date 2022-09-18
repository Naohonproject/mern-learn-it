import React from "react";
import { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Button from "react-bootstrap/esm/Button";
import { Link } from "react-router-dom";

import learnItLogo from "../../assets/logo.svg";
import logoutIcon from "../../assets/logout.svg";
import { AuthContext } from "../../context/authContext";

const NavbarMenu = () => {
  // dis-structuring, use context
  const {
    authState: {
      user: { userName },
    },
    logOutUser,
  } = useContext(AuthContext);

  // logout
  const logOut = () => {
    logOutUser();
  };

  return (
    //   contain all about the nav
    <Navbar expand="lg" bg="primary" variant="dark" className="shadow px-2">
      <Navbar.Brand className="font-weight-bolder text-white">
        <img
          src={learnItLogo}
          alt="learnItLogo"
          width="32"
          height="32"
          className="mr-2"
        />
        LearnIt
      </Navbar.Brand>

      {/* to display and toggle the Navbar.Collapse */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      {/* to contain the things that will be responsive */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/dashboard"
            as={Link}
          >
            Dashboard
          </Nav.Link>
          <Nav.Link
            className="font-weight-bolder text-white"
            to="/about"
            as={Link}
          >
            About
          </Nav.Link>
        </Nav>

        <Nav>
          <Nav.Link className="font-weight-bolder text-white" disabled>
            Welcome <span>{userName}</span>
          </Nav.Link>
          <Button
            onClick={logOut}
            variant="secondary"
            className="font-weight-bolder text-white"
          >
            <img
              src={logoutIcon}
              alt="logoutIcon"
              width="32"
              height="32"
              className="mr-2"
            />
            Logout
          </Button>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarMenu;
