import { useState, useContext } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

// import AuthContext to use the dataContext
import { AuthContext } from "../../context/authContext";
import AlertMessage from "../layout/AlertMessage";

const LoginForm = () => {
  // context
  const { logInUser } = useContext(AuthContext);

  // local state, login form data,alert
  const [loginForm, setLoginForm] = useState({ userName: "", password: "" });
  const [alert, setAlert] = useState(null);

  const { userName, password } = loginForm;

  // function to handle on change event on input from , change the value of state
  const onChangeLoginForm = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  // send request to server to login
  const login = async (event) => {
    event.preventDefault();
    try {
      const logInData = await logInUser(loginForm);
      if (!logInData.success) {
        setAlert({ type: "danger", message: logInData.message });
        setTimeout(() => setAlert(null), 5000);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="userName"
            required
            value={userName}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button className="my-2" variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        <span>Don't have an account?</span>
        <Link to="/register">
          <Button className="mx-2" variant="info" size="sm">
            Register
          </Button>
        </Link>
      </p>
    </>
  );
};
export default LoginForm;
