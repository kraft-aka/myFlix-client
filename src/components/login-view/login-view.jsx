import React, { useState } from "react";
import { Link } from "react-router-dom";

import axios from "axios";
import { Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row, } from "react-bootstrap";

import "./login-view.scss";
import { RegistartionView } from "../registration-view/registration-view";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  // validate user inputs
  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username Required");
      isReq = false;
    } else if (username.length < 5) {
      setUsernameErr("Username must be 5 characters long");
      isReq = false;
    }
    if (!password) {
      setPasswordErr("Password Required");
      isReq = false;
    } else if (password.length < 4) {
      setPassword("Password must be 4 characters long");
      isReq = false;
    }
    return isReq;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      // send a request to server for authentication
      axios
        .post("https://movie-api-1112.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log("no such user");
        });
    }
  };

  return (
    <Container className="main-cont color-overlay d-flex justify-content-center align-items-center mt-3">
      <Row>
        <Col>
          <CardGroup >
            <Card>
              <Card.Body className="card-body--login" style={{width:'30rem'}}>
              <Card.Title className="text-main ml-3">Please Log In</Card.Title>
              <Form className="rounded p-4 p-sm-3">
                <Form.Group className="mb-3">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter a username"
                  />{ usernameErr && <p className="text-warning">{usernameErr}</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="8"
                    placeholder="Password must be 8 or more characters"
                  /> { passwordErr && <p className="text-warning">{ passwordErr}</p>}
                </Form.Group>

                <Button variant="outline-primary mt-3 mb-3" type="submit" onClick={handleSubmit}>
                  SIGN IN
                </Button>
                <p className="text-center">
           Don't have an account?{" "}
         </p>
        <Link to= "/register">
           <Button variant="outline-primary">SIGN UP</Button>
         </Link>
              </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
//     <Container className="main-cont color-overlay d-flex justify-content-center align-items-center">
//       <Form className="rounded p-4 p-sm-3">
//         <h2>LOGIN PAGE</h2>
//         <Form.Group className="mb-3" controlId="formUsername">
//           <Form.Label>Username:</Form.Label>
//           <Form.Control
//             type="text"
//             placeholder="Enter username"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//           /> {usernameErr && <p>{ usernameErr }</p>}
//         </Form.Group>

//         <Form.Group controlId="formPassword">
//           <Form.Label>Password:</Form.Label>
//           <Form.Control
//             className="mb-3"
//             type="password"
//             placeholder="Enter password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//           /> { passwordErr && <p>{ passwordErr }</p>}
//         </Form.Group>
//         <Button variant="primary" type="submit" onClick={handleSubmit}>
//           SIGN IN
//         </Button>
//         <p className="text-center">
//           Don't have an account?{" "}
//         </p>
//         <Link to= "/register">
//           <Button className="btn btn-primary">SIGN UP</Button>
//         </Link> 
        
//       </Form>
//     </Container>
//   );
// }
