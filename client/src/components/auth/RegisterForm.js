import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link } from "react-router-dom";

const RegisterForm = () => {
  return (
    <>
      <Form className="my-4">
        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            placeholder="Username"
            name="userName"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
          />
        </Form.Group>
        <Button className="my-2" variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        <span>Already have an Account?</span>
        <Link to="/login">
          <Button className="mx-2" variant="info" size="sm">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
};

export default RegisterForm;
