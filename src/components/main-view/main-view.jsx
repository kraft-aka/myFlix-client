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

import { Col, Row, Button, Container } from "react-bootstrap";

import "./main-view.scss";

// MainView init
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      // list of movies,will be fetched from API
      movies: [],
      user: null,
    };
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
    }
  }

  // user veryfication and set user to current user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });

    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  // getMovies method
  getMovies(token) {
    axios
      .get("https://movie-api-1112.herokuapp.com/movies/", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        // assign the result to the state
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  render() {
    const { movies, user } = this.state;

    // if (!user)
    //   return (
    //     <Row>
    //       <Col>
    //         <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
    //       </Col>
    //     </Row>
    //   );

    // if (movies.length === 0) return <div className="main-view" />;

    return (
      <Router>
        <MenuBar user={user} />
        <Container>
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                // if (!user)
                //   return (
                //     <Col>
                //       <LoginView
                //         movies={movies}
                //         onLoggedIn={(user) => this.onLoggedIn(user)}
                //       />
                //     </Col>
                //   );
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
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
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
              path="/movie-director/:id"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                return (
                  <Col>
                    <DirectorView
                      movie={movies.find((m) => m._id === match.params.id)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Link to={`/users/${user}`}>{user}</Link>
            <Route
              path={`/users/${user}`}
              render={({ history }) => {
                if (!user) return;
                <Redirect to="/" />;
                return (
                  <Col>
                    <ProfileView
                      user={user}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );

                // if (!user) return <Redirect to="/" />;
                // return (
                //   <Col>
                //     <ProfileView
                //       movies={movies}
                //       user={user}
                //       onBackClick={() => history.goBack()}
                //     />
                //   </Col>
                // );
              }}
            />
            <Route
              path="/users/:username"
              render={({ history, match }) => {
                if (!user)
                  return (
                    <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <ProfileView
                    history={history}
                    movies={movies}
                    user={user === match.params.username}
                  />
                );
              }}
            />

            <Route
              path={`/user-update/${user}`}
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (!user) return <Redirect to="/" />;
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
        </Container>
      </Router>
    );
  }
}

MainView.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      Title: PropTypes.string.isRequired,
      Description: PropTypes.string.isRequired,
      ImagePath: PropTypes.string.isRequired,
    }).isRequired
  ),
};
