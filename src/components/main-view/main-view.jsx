import React from "react";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";

// MainView init
export class MainView extends React.Component {
  constructor() {
    super();
    this.state = {
      // list of movies
      movies: [
        {
          _id: 1,
          Title: "Bad Boys",
          Description: "desc1...",
          ImagePath: "...",
          Genre: 'Comedy',
        },
        {
          _id: 2,
          Title: "The Matrix Reloaded",
          Description: "desc2...",
          ImagePath: "...",
          Genre: 'Action',
        },
        {
          _id: 3,
          Title: "The Lord of the Rings: The Two Towers",
          Description: "desc3...",
          ImagePath: "...",
          Genre: 'Fantasy',
        },
      ],
  // default flag for sekected movie
      selectedMovie: null,
    };
  }

  // method to update the state of movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie
    });
  }

  render() {
    const { movies, selectedMovie } = this.state;

    if (movies.length === 0)
      return <div className="main-view">The list is empty!</div>;

    return (
      <div className="main-view">
        {selectedMovie ? (
          <MovieView
            movie={selectedMovie}
            onBackClick={(newSelectedMovie) => {
              this.setSelectedMovie(newSelectedMovie);
            }}
          />
        ) : (
          movies.map((movie) => (
            <MovieCard
              key={movie._id}
              movie={movie}
              onMovieClick={(movie) => {
                this.setSelectedMovie(movie);
              }}
            />
          ))
        )}
      </div>
    );
  }
}
