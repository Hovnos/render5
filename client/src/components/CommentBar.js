import Modal from "./Modal";
import { useState } from "react";
import Container from "react-bootstrap/Container";

import Navbar from "react-bootstrap/Navbar";

import Button from "../../node_modules/react-bootstrap/Button";

const CommentBar = ({ getData, comment }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <Navbar expand="lg" className="comment-bar1">
      <Container>
        <Navbar.Brand href="#home">SimpleComments</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav"></Navbar.Collapse>
        <Button
          className="button"
          onClick={() => setShowModal(true)}
          getData={getData}
        >
          Add comment
        </Button>
        {showModal && (
          <Modal
            setShowModal={setShowModal}
            getData={getData}
            comment={comment}
          />
        )}
      </Container>
    </Navbar>
  );
};

export default CommentBar;
