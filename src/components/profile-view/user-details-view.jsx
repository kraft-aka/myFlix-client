import React, {useState, useEffect} from "react";

import axios from "axios";
import { Container, Form, Row, Col,CardGroup, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
 

export function UserUpdate (props) {
  const [ user, setUser ] = useState('');
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [ favoriteMovies, setFavoriteMovies ] = useState([]);
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [emailErr, setEmailErr] = useState("");

  const loggedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

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

  const getUser = () => {
    axios
      .get(`https://movie-api-1112.herokuapp.com/users/${loggedUser}`, {
        headers: { Authorization: `Bearer ${token}`}, 
      })
        .then((response) => {
          console.log(response.data);
          setUser(response.data)
        })
        .catch((error) => console.log(error));
  }

  const editProfile = () => {
    axios
      .put(`https://movie-api-1112.herokuapp.com/user-update/${loggedUser}`, {
        headers: { Authorization: `Bearer ${token}`}, 
        Username: username,
        Password: password,
        Email: email,
        Birthday: birthday,
      })

      .then((response)=> {
        console.log(response.data);
        alert(`${loggedUser}'s Profile Successfully Updated`);
      })
      .catch((error)=> console.log(error));
      alert('Could not update Profile')
  }

  useEffect(()=> {
    getUser();
  },[])



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
                    placeholder= {loggedUser}
                    
                  />{ usernameErr && <p className="text-warning">{usernameErr}</p>}
                  <p>Set new Username</p>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Password:</Form.Label>
                  <Form.Control
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength="4"
                    placeholder="*********"
                  /> { passwordErr && <p className="text-warning">{ passwordErr}</p>}
                  <p>Set new Password</p>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder= {user.Email}
                  /> { emailErr && <p className="text-warning">{ emailErr }</p>}
                  <p>Set new Email</p>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Birthday:</Form.Label>
                  <Form.Control
                    type="date"
                    value={birthday}
                    placeholder={user.Birthday}
                    onChange={(e) => setBirthday(e.target.value)}
                    required
                  />
                  <p>Set new Birthday</p>
                </Form.Group>
                <div className="d-flex justify-content-md-center">
                <Button variant="outline-primary mt-3" type="submit" onClick={editProfile} >
                  Update
                </Button>
                <Link to={`/`}>
                  <Button className="btn" variant="outline-success ml-3 mt-3" type="submit">
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