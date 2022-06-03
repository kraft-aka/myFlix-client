import React, { useState, useEffect } from "react";
import axios from "axios";

import {
  Container,
  Row,
  Col,
  Card,
  CardGroup,
  Button,
  Form,
  FormGroup,
} from "react-bootstrap";
import { Link } from "react-router-dom";

import './profile-view.scss';

export function ProfileView(props) {
  const [user, setUser] = useState("");
  const [movies, setMovies] = useState(props.movies);
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const loggedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  let id = movies.map(m=> m._id);

  // Get a logged user
  const getUser = () => {
    axios
      .get(`https://movie-api-1112.herokuapp.com/users/${loggedUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setUser(response.data);
      })
      .catch((error) => console.log(error));
  };

  //fetch movies from API
  const getMovies = () => {
    axios
      .get("https://movie-api-1112.herokuapp.com/movies/", {
        headers: { Authorization: `Bearer ${token}` }, // authenticated HTTP request to API
      })
      .then((response) => {
        console.log(response);
        // assign the result to the state
        setMovies(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getUser();
    getMovies();
  }, []);

  // delete user's profile
  const handleDelete = () => {
    axios
      .delete(`https://movie-api-1112.herokuapp.com/users/${loggedUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(`${loggedUser}'s profile has been deleted!`);
        localStorage.clear();
        window.open("/register", "_self");
      })
      .catch((error) => console.log(error));
  };

  // add movies to favorites 
  const addMovie = (id) => {
    setFavoriteMovies(()=> {
      favoriteMovies.push(movies.id)
    })
    console.log(id)
  }

  // delete movie from favorites


  // render the favoriteList
  

  return (
    <Container fluid>
      <Row className="d-flex justify-content-md-center mt-3">
        <Col sm={6} lg={4}>
          <h2 className="text-main text-center mt-3 mb-3">
            {loggedUser.toUpperCase()}'s Profile
          </h2>
        </Col>
      </Row>

      <Row className="d-flex justify-content-md-center mt-3 mb-2">
        <Col sm={8} className="text-main">
          Username:
        </Col>
        <Col sm={8} className="text-main">
          {user.Username}
        </Col>
      </Row>
      <Row className="d-flex justify-content-md-center mt-3 mb-2">
        <Col sm={8} className="text-main">
          Password:
        </Col>
        <Col sm={8}>************</Col>
      </Row>
      <Row className="d-flex justify-content-md-center mt-3 mb-2">
        <Col sm={8} className="text-main">
          Email:
        </Col>
        <Col sm={8}>{user.Email}</Col>
      </Row>
      <Row className="d-flex justify-content-md-center mt-3 mb-2">
        <Col sm={8} className="text-main">
          Birthday:
        </Col>
        <Col sm={8}>{user.Birthday}</Col>
      </Row>
      <Row className="d-flex justify-content-md-center mt-3 mb-2">
        <Col sm={8} className="text-main">
          Favorite Movies:
        </Col>
        <Col sm={8}>{user.favoriteMovies}</Col>
      </Row>
      <Row className="d-flex justify-content-md-center mt-3 mb-2">
        <Button variant="outline-warning" onClick={handleDelete}>
          Delete Profile
        </Button>
        <Link to={`/`}>
          <Button className="btn" variant="outline-success ml-3" type="submit">
            Back to Home
          </Button>
        </Link>
      </Row>
    </Container>
  );
}
