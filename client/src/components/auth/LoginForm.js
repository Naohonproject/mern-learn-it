import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const LoginForm = () => {
  return (
    <>
      <Form className="my-4">
        <Form.Group className="mb-4">
          <Form.Control
            type="text"
            placeholder="Username"
            name="userName"
            required
          />
        </Form.Group>
        <Form.Group className="mb-4">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
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
