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
import { UserUpdate } from "./user-details-view";
import { Link } from "react-router-dom";

export function ProfileView(props) {
  const [user, setUser] = useState("");
  const [movies, setMovies] = useState(props.movies);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const loggedUser = localStorage.getItem("user");
  const token = localStorage.getItem("token");

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

  const updateProfile = (e) => {
    e.preventDefault();
    axios
      .put(
        `https://movie-api-1112.herokuapp.com/user-update/${loggedUser}`,
        {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )

      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        localStorage.setItem("user", response.data.Username);
        alert(`${loggedUser}'s Profile Successfully Updated`);
        window.open('/', "_self");
      })
      .catch((error) => console.log(error));
    alert("Could not update Profile");
  };

  const renderFavMovies = () => {
    console.log(movies);
    if (movies.length + 0) {
      <Row>
      {favoriteMovies.length === 0 ? (
        <h4>No Movies in Favorites</h4>
      ) : (
        favoriteMovies.map((m_id) => (
          <Col>
            <MovieCard key={m_id} movie={movies.find((m) => m._id == m_id)} />
          </Col>
        ))
      )}
    </Row>;
  };
}
    

  return (
    <Container fluid>
      <Row>
        <Col>
          <Form className="rounded p-4 p-sm-3">
            <Form.Group className="mb-3">
              <Form.Label>Username:</Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={user.Username}
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
                placeholder={user.Email}
              />
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
            
              
              <Row className="d-flex justify-content-md-center mt-3 ml-3 mb-2">
              <Button
                variant="outline-primary mt-3"
                type="submit"
                onClick={updateProfile}
              >
                Update
              </Button>
                <Button variant="outline-warning" onClick={handleDelete}>
                  Delete Profile
                </Button>
                <Link to={`/`}>
                  <Button
                    className="btn"
                    variant="outline-success ml-3"
                    type="submit"
                  >
                    Back to Home
                  </Button>
                </Link>
              </Row>
            
            <h4>Favotite Movies: </h4>
            
            {renderFavMovies()}
          </Form>
        </Col>
      </Row>
      {/* <Row className="d-flex justify-content-md-center mt-3">
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
      </Row> */}
    </Container>
  );
}
