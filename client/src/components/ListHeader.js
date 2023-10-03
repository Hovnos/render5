import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Auth from "./Auth";

const ListHeader = () => {
  return (
    <Navbar expand="lg" style={{ backgroundColor: "#f2b147" }}>
      <Container fluid>
        <Navbar.Brand href="#home">SimpleWebsite</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>

            <NavDropdown title="Resume" id="basic-nav-dropdown">
              <NavDropdown.Item href="/resumeEng">ENG</NavDropdown.Item>
              <NavDropdown.Item href="/resumeSvk">SVK</NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/about">About</Nav.Link>

            <Nav.Link href="/xxxk">xxx</Nav.Link>
          </Nav>
          <Auth />
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ListHeader;
