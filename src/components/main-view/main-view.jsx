import React from "react";
import axios from "axios";
import PropTypes from "prop-types";

import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

// import views to the main-view
import { RegistartionView } from "../registration-view/registration-view";
import { ProfileView } from "../profile-view/profile-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { MenuBar } from "../navbar/navbar";
import { GenreView } from "../genre-view/genre-view";
import { DirectorView } from "../director-view/director-view";
import { UserUpdate } from "../profile-view/user-details-view";

import { Col, Row, Button, Container, Spinner } from "react-bootstrap";

import "./main-view.scss";

// MainView init
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      // list of movies,will be fetched from API
      movies: [],
      user: null,
      loading: true,
    };
  }

  // getMovies method
  getMovies(token) {
    axios
      .get("https://movie-api-1112.herokuapp.com/movies/", {
        headers: { Authorization: `Bearer ${token}` }, // authenticated HTTP request to API
      })
      .then((response) => {
        // assign the result to the state
        this.setState({
          loading: false,
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  // tell browser that the user is logged in
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    let user = localStorage.getItem("user");
    if (accessToken !== null) {
      this.setState({
        user: user,
      });
      this.getMovies(accessToken);
    }
  }

  // user veryfication/updates state and sets user to current user
  onLoggedIn(authData) {
    //data comes from login-view
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token); // token is received from handleSubmit() is saved in localStorage
    localStorage.setItem("user", authData.user.Username); // user is received from handleSubmit() is saved in localStorage
    this.getMovies(authData.token); // getMovies() called in once the user is logged in
  }

  render() {
    const { movies, user } = this.state;

    return (
      <Router>
        {/* <Container> */}
        <Col md={12} style={{ padding: 0 }}>
          <MenuBar user={user} movies={movies} />
          <Col sm={12} md={8}>
            <Row className="d-flex-justify content-center">
              {this.state.loading ? (
                <h4 className="d-flex justify-content-center m-2">
                  Loading...
                  <Spinner
                    className="d-flex justify-content-center m-2"
                    animation="border"
                    role="status"
                    variant="success"
                  ></Spinner>
                </h4>
              ) : null}
            </Row>
          </Col>

          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col md={8}>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );

                if (movies.length === 0) return <div className="main-view" />;

                return movies.map((m) => (
                  <Col md={3} key={m._id}>
                    <MovieCard movie={m} />
                  </Col>
                ));
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col lg={8} md={8}>
                    <RegistartionView />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <Redirect to="/register" />
                    </Col>
                  );
                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path={`/users/${user}`}
              render={({ match, history }) => {
                console.log(user, movies);
                if (!user) return <Redirect to="/" />;
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <ProfileView
                      history={history}
                      movies={movies}
                      user={user}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path={`/user-update/${user}`}
              render={({ match, history }) => {
                if (!user) return <Redirect to="/register" />;
                return (
                  <Col>
                    <UserUpdate
                      user={user}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/genres/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                return (
                  <Col md={8}>
                    <GenreView
                      genre={
                        movies.find((m) => m.Genre.Name === match.params.name)
                          .Genre
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      director={
                        movies.find(
                          (m) => m.Director.Name === match.params.name
                        ).Director
                      }
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
          </Row>
        </Col>
        {/* </Container> */}
      </Router>
    );
  }
}

// MainView.propTypes = {
//   movies: PropTypes.arrayOf(
//     PropTypes.shape({
//       Title: PropTypes.string.isRequired,
//       Description: PropTypes.string.isRequired,
//       ImagePath: PropTypes.string.isRequired,
//     }).isRequired
//   ),
// };
