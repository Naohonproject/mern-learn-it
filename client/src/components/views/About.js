import { Button, Row, Col } from "react-bootstrap";

const About = () => {
  return (
    <Row className="mt-5" style={{ marginRight: 0 }}>
      <Col className="text-center">
        <Button
          variant="primary"
          href="https://www.facebook.com/bao.letuan.90/"
          size="lg"
        >
          Visit My Facebook
        </Button>
      </Col>
    </Row>
  );
};

export default About;
