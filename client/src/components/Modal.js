import { useState } from "react";
import Button from "../../node_modules/react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "../../node_modules/react-bootstrap/Form";
import Auth from "./Auth";
import { useCookies } from "react-cookie";

const Modal = ({ setShowModal, getData }) => {
  const [cookies] = useCookies(null);
  const authToken = cookies.AuthToken;
  const c_nick = cookies.c_nick;
  const [data, setData] = useState({
    c_nick: authToken ? c_nick : "need to be logged in",
    c_text: "",
  });

  const addComment = async (e) => {
    e.preventDefault();
    if (data.c_nick.trim() === "" || data.c_text.trim() === "") {
      console.error("Please fill in both nickname and message fields.");

      setShowModal(false);
      return;
    }
    try {
      if (authToken) {
        const response = await fetch(
          `${process.env.REACT_APP_SERVERURL}/comments`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
          }
        );

        if (response.status === 200) {
          console.log("Comment added successfully");

          setShowModal(false);
          getData();
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setData((data) => ({
      ...data,
      [name]: value,
    }));
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>nickname</Form.Label>
        <Form.Control
          placeholder="nickname"
          required
          maxLength={10}
          name="c_nick"
          value={authToken ? c_nick : data.c_nick}
          onChange={handleChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Your message</Form.Label>
        <Form.Control
          placeholder="text"
          required
          maxLength={500}
          name="c_text"
          value={data.c_text}
          onChange={handleChange}
        />
      </Form.Group>

      <Button variant="primary" type="submit" onClick={addComment}>
        Submit
      </Button>
      <Button
        variant="primary"
        type="submit"
        onClick={() => setShowModal(false)}
      >
        Cancel
      </Button>
    </Form>
  );
};

export default Modal;
