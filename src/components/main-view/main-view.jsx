import React from "react";
import axios from "axios";

// import views to the main-view
import { RegistartionView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import { Col, Row } from "react-bootstrap"; 

// MainView init
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      // list of movies,will be fetched from API
      movies: [],
      // default flag for selected movie
      selectedMovie: null,
      user: null,
      registered: false, // should be switched to false
    };
  }

  // query movies from myFlix API
  componentDidMount() {
    axios
      .get("https://movie-api-1112.herokuapp.com/movies/")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // method to update the state of movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  // user veryfication and set user to current user
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  // user register
  onRegisteredIn(registered) {
    this.setState({
      registered,
    });
  }

  render() {
    const { movies, selectedMovie, user, registered } = this.state;

    if (!registered)
      return (
        <RegistartionView
          onRegisteredIn={(bool) => this.onRegisteredIn(bool)}
        />
      );

    if (!user)
      return (
        <LoginView
          onLoggedIn={(user) => this.onLoggedIn(user)}
          onRegisteredIn={(bool) => this.onRegisteredIn(bool)}
        />
      );

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content-md-center">
        {selectedMovie
          ? (
            <Col md={8}>
              <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
            </Col>
          )
          : movies.map(movie => (
            <Col md={3}>
              <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
            </Col>
          ))
        }
      </Row>
    );
  }
}
