import React, {useState, useEffect} from "react";

import axios from "axios";
import { Container, Form, Row, Col,CardGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
 

export function UserUpdate (props) {
  const {user} = (props);
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  
 
  const loggedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');



  const editProfile = (e) => {
    e.preventDefault();
    axios
      .put(`https://movie-api-1112.herokuapp.com/users/${loggedUser}`,
      { 
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday
      }, {
        headers: { Authorization: `Bearer ${token}`}, })

      .then((response)=> {
        console.log(response.data);
        //setUser(response.data);
        localStorage.setItem('user', response.data.Username);
        alert(`${loggedUser}'s Profile Successfully Updated`);
        window.open('/' , '_self')
      })
      .catch((error)=> console.log(error));
  }


  return(
    <Container className="main-cont color-overlay d-flex justify-content-center align-items-center mt-3">
      <Row>
        <Col>
          <CardGroup >
            <Card>
              <Card.Body className="card-body--register" style={{width:'30rem'}}>
              <Card.Title className="text-main ml-3">Update Your Profile {loggedUser}</Card.Title>
              <Form className="rounded p-4 p-sm-3">
                <Form.Group className="mb-3">
                  <Form.Label>Username:</Form.Label>
                  <Form.Control
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder= 'Username'
                    
                  />
                  <p>Set new Username</p>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    minLength="4"
                    placeholder="*********"
                  /> 
                  <p>Set new Password</p>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder= 'user@mail.com'
                  /> 
                  <p>Set new Email</p>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    placeholder='DD-MM-YYYY'
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                  <p>Set new Birthday</p>
                </Form.Group>
                <div className="d-flex justify-content-md-center">
                <Button variant="outline-primary mt-3 mr-3" type="submit" onClick={editProfile} >
                  Update
                </Button>
                <Link to={`/`}>
                  <Button className="btn-submit" variant="outline-success ml-3 mt-3" type="submit">
                    Cancel
                  </Button>
                  </Link>
                </div>
                
              </Form>
              </Card.Body>
            </Card>
          </CardGroup>
        </Col>
      </Row>
    </Container>
  )
}