import { Card, Row, Col, Badge, Button } from "react-bootstrap";
import ActionButton from "./ActionButtons";
const SinglePost = ({ post: { _id, status, title, description, url } }) => {
  return (
    <Card
      className="shadow"
      border={
        status === "LEARNED"
          ? "success"
          : status === "LEARNING"
          ? "warning"
          : "danger"
      }
    >
      <Card.Body>
        <Card.Title>
          <Row>
            <Col>
              <p className="post-title">{title}</p>
              <Badge
                pill
                bg={
                  status === "LEARNED"
                    ? "success"
                    : status === "LEARNING"
                    ? "warning"
                    : "danger"
                }
              >
                {status}
              </Badge>
            </Col>
            <Col className="text-end">
              <ActionButton url={url} _id={_id} />
            </Col>
          </Row>
        </Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SinglePost;
