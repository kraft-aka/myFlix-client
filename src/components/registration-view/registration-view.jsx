import React, { useState } from "react";

import { Form, Button } from "react-bootstrap";

export function RegistartionView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birthday);
    props.onRegisteredIn(false);
  };

  return (
    <Form>
      <Form.Group>
        <Form.Label>
          Username:
          <Form.Control
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter a username"
          />
        </Form.Label>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          Password:
          <Form.Control
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter a password"
          />
        </Form.Label>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          Email:
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="username@hotmail.com"
          />
        </Form.Label>
      </Form.Group>

      <Form.Group>
        <Form.Label>
          Birthday:
          <Form.Control
            type="date"
            value={birthday}
            onChange={(e) => setBirthday(e.target.value)}
          />
        </Form.Label>
      </Form.Group>
      <Button type="submit" onClick={handleSubmit}>
        Register
      </Button>
    </Form>
  );
}
