import React, { useState, useEffect } from "react";
import { Button, Card, Container, Row, Col } from "react-bootstrap";

import axios from "axios";
import { UserUpdate } from "./user-details-view";
import { FavoriteMoviesView } from "./favorite-movies";

export function ProfileView(props) {
  const [user, setUser] = useState(props.user);
  const [movies, setMovies] = useState(props.movies);
  const [favoriteMovies, setFavoriteMovies] = useState("");
  const loggedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  const getUser = () => {
    axios
      .get(`https://movie-api-1112.herokuapp.com/users/${loggedUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setFavoriteMovies(response.data.favoriteMovies);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => getUser(), []);

  const deleteUser = () => {
    axios
      .delete(`https://movie-api-1112.herokuapp.com/users/${loggedUser}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        alert(`${loggedUser}'s profile deleted!`);
        localStorage.clear("user");
        localStorage.clear("token");
        window.open("/register", "_self");
      })
      .catch((error) => console.log(error));
  };

  return (
    <Container>
      <Row>
        <h4>Your profile</h4>
      </Row>
      <Row>
        <Col className="label">Username:</Col>
        <Col className="value">{user.Username}</Col>
      </Row>
      <Row className="mt-3">
        <Col className="label">Password:</Col>
        <Col className="value">******</Col>
      </Row>
      <Row className="mt-3">
        <Col className="label">Email:</Col>
        <Col className="value">{user.Email}</Col>
      </Row>
      <Row className="mt-3">
        <Col className="label">Birthday:</Col>
        <Col className="value">{user.Birthday}</Col>
      </Row>
      <Row className="mt-5">
        <h4>Your favorite movies</h4>
      </Row>
      <Row className="mt-3">
        <FavoriteMoviesView
          movies={movies}
          favoriteMovies={favoriteMovies}
          loggedUser={loggedUser}
          token={token}
        />
      </Row>
      <UserUpdate user={user} />
      <Button className="d-block mt-5" variant="warning" onClick={deleteUser}>
        Delete profile
      </Button>
    </Container>
  );
}
