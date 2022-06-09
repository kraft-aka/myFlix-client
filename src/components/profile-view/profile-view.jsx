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
import { FavoriteMovies } from "./favorite-movies";

import './profile-view.scss';

export function ProfileView(props) {
  const [user, setUser] = useState("");
  const [movies, setMovies] = useState(props.movies);
  const [favoriteMovies, setFavoriteMovies] = useState([]);
  

  const loggedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");


  // Get a logged user
  const getUser = () => {
    axios
      .get(`https://movie-api-1112.herokuapp.com/users/${loggedUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        setUser(response.data);
        setFavoriteMovies(response.data.FavoriteMovies);
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

    

  return (
    <Container fluid>
      {/* <Row className="d-flex justify-content-md-center mt-3">
        <Col sm={6} lg={4}>
          <h2 className="text-main text-center mt-3 mb-3">
            {loggedUser.toUpperCase()}'s Profile
          </h2>
        </Col>
      </Row> */}

      <Row className="d-flex justify-content-md-center mt-5 mb-2">
        <Col sm={8} className="h4 text-main">
          <Card>
            <Card.Body>
              <Card.Title>User Info</Card.Title> 
              <Card.Text className="h5 user-name--text">Username: <span>{user.Username}</span></Card.Text>
              <Card.Text className="h5 user-name--text">E-Mail: <span>{user.Email}</span></Card.Text>
            </Card.Body>
          </Card>   
        </Col>
      </Row>
      <Row className="d-flex justify-content-md-center mt-3 mb-2">
        <Col sm={8} className="h4 text-main">
              <h5>Favorite Movies</h5> 
              <Row>
                <FavoriteMovies movies={movies} favoriteMovies={favoriteMovies} loggedUser={loggedUser} token={token}/>
              </Row>
        </Col>
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
