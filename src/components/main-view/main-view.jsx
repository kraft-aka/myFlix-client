import React from "react";
import axios from "axios";

import { BrowserRouter as Router, Route } from "react-router-dom";

// import views to the main-view
import { RegistartionView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import { Col, Row, Button } from "react-bootstrap";

import "./main-view.scss"

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
      registered: true, // should be switched to false
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

  componentDidMount() {
    let accessToken = localStorage.getItem('token');
    if(accessToken !== null) {
      this.setState({
        user: localStorage.getItem('user')
      });
      this.getMovies(accessToken);
    }
  }

  // method to update the state of movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  // user veryfication and set user to current user
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username
    });

    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', authData.user.Username);
    this.getMovies(authData.token);
  }

  // log out a user
  onLoggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.setState({
      user: null
    });
  }

  // getMovies method
  getMovies(token) {
    axios.get("https://movie-api-1112.herokuapp.com/movies/",{
      headers: { Authorization: `Bearer ${token}`}
    })
      .then(response=> {
  // assign the result to the state
        this.setState({
          movies: response.data
        });
      })
      .catch(function(error) {
        console.log(error)
      });
  }

  // user register
  onRegisteredIn(registered) {
    this.setState({
      registered: true
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
      <React.Fragment>
        <Row className="main-view justify-content-md-center">
        {selectedMovie ? (
          <Col md={8}>
            <MovieView
              movie={selectedMovie}
              onBackClick={(newSelectedMovie) => {
                this.setSelectedMovie(newSelectedMovie);
              }}
            />
          </Col>
        ) : (
          movies.map((movie) => (
            <Col md={3}>
              <MovieCard
                key={movie._id}
                movie={movie}
                onMovieClick={(newSelectedMovie) => {
                  this.setSelectedMovie(newSelectedMovie);
                }}
              />
            </Col>
          ))
        )}
         
      </Row>
      <Button onClick={()=> {this.onLoggedOut() }}>LOGOUT</Button>
      </React.Fragment>
      
      

    );
   
  }
}
