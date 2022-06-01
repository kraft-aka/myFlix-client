

import React, { useState, useEffect} from "react";
import axios from "axios";

import { Container, Row,Col, Card, Button } from "react-bootstrap";
import userImg from '../../assets/images/userImg.png'

export function ProfileView (props) {

  const [user, setUser ] = useState('');
  //const [movies, setMovies] = useState(props.movies);
  const loggedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token');

  const getUser = () => {
    axios 
      .get(`https://movie-api-1112.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}`}, 
      })
      .then((response) => {
        console.log(response);
        setUser(response.data)
      })
      .catch((error) => console.log(error));    
  }

  useEffect(()=> {
    getUser()
  },[]);

  const handleDelete = () => {
    axios
      .delete(`https://movie-api-1112.herokuapp.com/users/${loggedUser}`, {
        headers: { Authorization: `Bearer ${token}`}, 
      })
      .then(()=> {
        alert(`${loggedUser}'s profile has been deleted!`)
        localStorage.clear();
        window.open('/register', '_self')
      })
      .catch((error)=> console.log(error));
  }

  return (
    <Container>
      
        <h3 className="text-main text-center">{loggedUser.toUpperCase()}'s Profile</h3>
      
      <Row className="d-flex justify-content">
        <Col className="text-main d-flex justify-content">Username:</Col>
        <Col>{loggedUser}</Col>
      </Row>
      <Row>
        <Col>Password: </Col>
        <Col>xxxxxxxx</Col>
      </Row>
      <Row>
        <Col>Email: </Col>
        <Col>{user.Email}</Col>
      </Row>
      <Row>
        <Col>Birthday</Col>
        <Col>{user.Birthday}</Col>
      </Row>
      <Row>
        <Col>Favorite Movies: </Col>
        <Col>{user.FavoriteMovies}</Col>
      </Row>
      <Container>
        <Button variant="outline-warning" onClick={handleDelete}>Delete Profile</Button>
      </Container>
    </Container>
  )
}

