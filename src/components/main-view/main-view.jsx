import React from "react";
import axios from "axios";

import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

import { Row, Col } from "react-bootstrap";

// MainView init
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      // list of movies
      movies: [],
      // default flag for sekected movie
      selectedMovie: null,
      
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

  render() {
    const { movies, selectedMovie,user } = this.state;

    if (movies.length === 0) return <div className="main-view" />;

    return (
      <Row className="main-view justify-content m-3 p-5">
        {selectedMovie ? (
           
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
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
    );
  }
}
