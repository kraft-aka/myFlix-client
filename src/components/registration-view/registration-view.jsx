import axios from "axios";
import React, { useState } from "react";
import PropTypes from 'prop-types';

import {
  Form,
  Button,
  Card,
  CardGroup,
  Container,
  Col,
  Row,
} from "react-bootstrap";

import "./registration-view.scss"


export function RegistartionView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  // validate mathod
  const validate = () => {
    let isReq = true;
    if(!username) {
      setUsernameErr('Username Required!')
      isReq = false
    } else if (username.length < 2) {
      setUsernameErr('Username must be more than 2 characters long')
      isReq = false;
    }

    if(!password) {
      setPasswordErr('Password Required!')
      isReq = false;
    } else if( password.length < 4) {
      setPasswordErr('Password must at least 4 characters long')
      isReq = false
    }
    
    if(!email) {
      setEmailErr('Email Required!')
      isReq = false
    } else if(email.indexOf("@") === -1) {
      setEmailErr('Please Enter Valid Email')
      isReq = false
    }
    return isReq;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let isReq = validate();
    if (isReq) {
      axios.post("https://movie-api-1112.herokuapp.com/users", {
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      })
       .then(response => {
         const data = response.data;
         console.log(data);
         alert('Registartion successful, please login!');
         window.open('/','_self');

       })
       .catch(response => {
         console.error(response)
         alert('Unable to register')
       })
    }
    console.log(username, password, email, birthday);
    props.onRegisteredIn(false);
  };

  return (
    <Container className="main-cont color-overlay d-flex justify-content-center align-items-center mt-3">
      <Row>
        <Col>
          <CardGroup >
            <Card>
              <Card.Body className="card-body" style={{width:'30rem'}}>
              <Card.Title className="text-main ml-3">Please Register</Card.Title>
              <Form className="rounded p-4 p-sm-3">
                <Form.Group className="mb-3">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter a username"
                  />{ usernameErr && <p>{usernameErr}</p>}
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
                  /> { passwordErr && <p>{ passwordErr}</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="user@gmail.com"
                  /> { emailErr && <p>{ emailErr }</p>}
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="outline-primary mt-3" type="submit" onClick={handleSubmit}>
                  Register
                </Button>
              </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  );
}


RegistartionView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired
  }),
}
