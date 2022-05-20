import React, { useState } from "react";
import PropTypes from "prop-types";

import { Form, Button, Container, Card, CardGroup } from "react-bootstrap";

import "./login-view.scss";

export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username);
  };

  return (
    <div className="color-overlay d-flex justify-content-center align-items-center">
      <Form className="rounded p-4 p-sm-3">
        <h2>LOGIN PAGE</h2>
        <Form.Group className="mb-3" controlId="formUsername">
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            className="mb-3"
            type="password"
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

LoginView.propTypes = {
  name: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onLoggedIn: PropTypes.func.isRequired,
};
