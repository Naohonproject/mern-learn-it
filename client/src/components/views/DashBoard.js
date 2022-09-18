import { useContext, useEffect } from "react";
import {
  Row,
  Col,
  Card,
  Spinner,
  Button,
  OverlayTrigger,
  Tooltip,
  Toast,
} from "react-bootstrap";

import { PostContext } from "../../context/postContext";
import { AuthContext } from "../../context/authContext";
import SinglePost from "../posts/SinglePost";
import AddPostModal from "../posts/AddPostModal";
import addIcon from "../../assets/plus-circle-fill.svg";

const DashBoard = () => {
  // context
  const {
    postState: { posts, postLoading },
    getPosts,
    setShowAddPostModal,
    showToast: { show, message, type },
    setShowToast,
  } = useContext(PostContext);

  const {
    authState: {
      user: { userName },
    },
  } = useContext(AuthContext);

  // get all posts
  useEffect(() => {
    getPosts();
  }, []);

  let body = null;

  if (postLoading) {
    body = (
      <div className="spinner-container">
        <Spinner animation="border" variant="info" />
      </div>
    );
  } else if (posts.length === 0) {
    body = (
      <>
        <Card className="text-center mx-5 my-5">
          <Card.Header as="h1">Hello {userName}</Card.Header>
          <Card.Body>
            <Card.Title>Welcome to LearIt</Card.Title>
            <Card.Text>
              Click button to make your first track of leaning
            </Card.Text>
            <Button onClick={() => setShowAddPostModal(true)} variant="primary">
              Track
            </Button>
          </Card.Body>
        </Card>
      </>
    );
  } else {
    body = (
      <>
        <Row className="row-cols-1 row-cols-md-3 g-4 mx-auto mt-3">
          {posts.map((post) => {
            return (
              <Col className="my-2" key={post._id}>
                <SinglePost post={post} />
              </Col>
            );
          })}
        </Row>
        {/* button to open add post modal */}
        <OverlayTrigger
          placement="left"
          overlay={<Tooltip>Add New Technology To Learn</Tooltip>}
        >
          <Button
            className="btn-floating"
            onClick={() => setShowAddPostModal(true)}
          >
            <img src={addIcon} alt="add-post" width="60" height="60" />
          </Button>
        </OverlayTrigger>
      </>
    );
  }

  return (
    <>
      {body}
      <AddPostModal />
      {/* show Toast after post created */}
      <Toast
        delay={5000}
        autohide
        onClose={() =>
          setShowToast({
            show: false,
            message: null,
            type: null,
          })
        }
        show={show}
        style={{ position: "fixed", top: "20%", right: "10px" }}
        className={`bg-${type} text-white`}
      >
        <Toast.Body>
          <strong>{message}</strong>
        </Toast.Body>
      </Toast>
    </>
  );
};

export default DashBoard;
