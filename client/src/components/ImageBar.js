import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import dumbier3 from "../images/dumbier3.jpg";
import umb from "../images/umb.jpg";
import umb2 from "../images/umb2.jpg";

const ImageBar = () => {
  return (
    <Container className="image-bar-container">
      <Row>
        <Col sm={4}>
          <img src={umb} className="image-bar-img" alt="umb" />
        </Col>
        <Col sm={4}>
          <img src={dumbier3} className=" image-bar-img" alt="dumbier" />
        </Col>
        <Col sm={4}>
          <img src={umb2} className="image-bar-img-small" alt="umb2" />
        </Col>
      </Row>
    </Container>
  );
};

export default ImageBar;
