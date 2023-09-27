import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useState } from "react";
import { useCookies } from "react-cookie";
import Button from "../../node_modules/react-bootstrap/Button";
import "bootstrap/dist/css/bootstrap.min.css";
import Form from "../../node_modules/react-bootstrap/Form";

const Auth = () => {
  const [error, setError] = useState(null);
  //const [isLogin, setIsLogin] = useState(false);
  const [c_nick, setNick] = useState(null);
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showSignForm, setShowSignForm] = useState(false);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [cookies, setCookie, removeCookie] = useCookies();

  const handleSubmit = async (e, endpoint) => {
    e.preventDefault();
    if (showSignForm && password !== confirmPassword) {
      setError("Not matching passes");
      return;
    }
    const response = await fetch(
      `${process.env.REACT_APP_SERVERURL}/${endpoint}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ c_nick, password }),
      }
    );
    const data = await response.json();
    console.log(data);
    if (data.detail) {
      setError(data.detail);
    } else {
      setCookie("c_nick", data.c_nick);
      setCookie("AuthToken", data.token);

      //reload page
      window.location.reload();
    }
  };
  const logOut = () => {
    console.log("logout");
    removeCookie("c_nick");
    removeCookie("AuthToken");
  };

  const authToken = cookies.AuthToken;
  const handleFormClick = () => {
    setShowLoginForm(false);
    setShowSignForm(false);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      {!authToken && (
        <Container fluid>
          <Nav className="me-auto">
            <Nav.Link href="#link" onClick={() => setShowSignForm(true)}>
              {showSignForm || showSignForm ? "" : "Sign In"}{" "}
            </Nav.Link>
            <Nav.Link href="#link" onClick={() => setShowLoginForm(true)}>
              {showLoginForm || showSignForm ? "" : "Log In"}
            </Nav.Link>
          </Nav>
          {(showLoginForm || showSignForm) && (
            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Control
                  type="text"
                  placeholder="Enter nick"
                  onChange={(e) => setNick(e.target.value)}
                />
                <Form.Text className="text-muted"></Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>
              {showSignForm && (
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                </Form.Group>
              )}

              <Button
                variant="primary"
                type="submit"
                onClick={(e) =>
                  handleSubmit(e, showSignForm ? "signup" : "login")
                }
              >
                Submit
              </Button>
              <Button
                variant="primary"
                type="submit"
                onClick={() => handleFormClick()}
              >
                Cancel
              </Button>
              {error && <p>{error}</p>}
            </Form>
          )}
        </Container>
      )}
      {authToken && (
        <Container>
          <Nav.Link href="#link" onClick={() => logOut()}>
            Log out
          </Nav.Link>
        </Container>
      )}
    </Navbar>
  );
};

export default Auth;
