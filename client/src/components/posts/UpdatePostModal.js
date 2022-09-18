import { Modal, Button, Form } from "react-bootstrap";
import { useContext, useState, useEffect } from "react";

import { PostContext } from "../../context/postContext";

const UpdatePostModal = () => {
  // contexts
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  // local states
  const [updatedPost, setUpdatedPost] = useState(post);
  useEffect(() => {
    setUpdatedPost(post);
  }, [post]);

  const { title, description, url, status } = updatedPost;

  const onChangeUpdatedPostForm = (event) => {
    setUpdatedPost({ ...updatedPost, [event.target.name]: event.target.value });
  };

  const closeDialog = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowUpdatePostModal(false);
    setShowToast({
      show: true,
      message: message,
      type: success ? "success" : "danger",
    });
  };
  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Making Progress ?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeUpdatedPostForm}
            />
            <Form.Text id="title-help" muted>
              Required
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-4">
            <Form.Control
              rows={3}
              as="textarea"
              placeholder="Description"
              name="description"
              value={description}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group className="mb-4">
            <Form.Control
              type="text"
              placeholder="Tutorial Link"
              name="url"
              value={url}
              onChange={onChangeUpdatedPostForm}
            />
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              value={status}
              name="status"
              onChange={onChangeUpdatedPostForm}
            >
              <option value="TO LEARN">TO LEARN</option>
              <option value="LEARNING">LEARNING</option>
              <option value="LEARNED">LEARNED</option>
            </Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Update
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdatePostModal;
