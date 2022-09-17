import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

// import AuthContext to use the dataContext
import { AuthContext } from "../../context/authContext";

const LoginForm = () => {
  // context
  const { logInUser } = useContext(AuthContext);

  // local state, login form data
  const [loginForm, setLoginForm] = useState({ userName: "", password: "" });
  const { userName, password } = loginForm;

  // navigate
  const navigate = useNavigate();

  // function to handle on change event on input from , change the value of state
  const onChangeLoginForm = (event) => {
    setLoginForm({
      ...loginForm,
      [event.target.name]: event.target.value,
    });
  };

  const login = async (event) => {
    event.preventDefault();
    try {
      const logInData = await logInUser(loginForm);
      if (logInData.success) {
        navigate("/dashboard");
      } else {
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <Form className="my-4" onSubmit={login}>
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
