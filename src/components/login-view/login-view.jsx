import React, { useState } from "react";

import axios from "axios";
import { Form, Button } from "react-bootstrap";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // send a request to server for authentication
    axios.post('https://movie-api-1112.herokuapp.com/login', {
      Username: username,
      Password: password
    })
      .then(response => {
        const data = response.data;
        props.onLoggedIn(data);
      })
      .catch(e => {
        console.log('no such user')
      });
  };

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form className="rounded p-4 p-sm-3">
        <h2>LOGIN PAGE</h2>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter username"
            value={ username }
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            className="mb-3"
            type="password"
            placeholder="Enter password"
            value={ password }
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={handleSubmit}>
          SIGN IN
        </Button>
        <p className="text-center">
          Don't have an account?{" "}
          <span className="btn btn-primary ml-3 mt-3">SIGN UP</span>
        </p>
      </Form>
    </div>
  );
}
