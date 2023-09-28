import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "../../node_modules/react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import { useCookies } from "react-cookie";

const Comment = ({ comment, getData }) => {
  const [cookies] = useCookies(null);
  const authToken = cookies.AuthToken;
  const c_nick = cookies.c_nick;

  const deleteComment = async () => {
    try {
      if (c_nick === "admin" || c_nick === comment.c_nick) {
        const response = await fetch(
          `${process.env.REACT_APP_SERVERURL}/comments/${comment.id}`,
          {
            method: "DELETE",
          }
        );
        if (response.status === 200) {
          getData();
        } else {
          console.error("Failed to delete comment");
        }
      } else {
        console.error("You are not authorized to delete this comment.");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container fluid className="comment-container">
      <div className="nick">{comment.c_nick}</div>
      <div className="comment-text overflow-wrap-break">{comment.c_text}</div>
      <div className="delete-button">
        <Button onClick={deleteComment}>Delete comment</Button>
      </div>
    </Container>
  );
};

export default Comment;
