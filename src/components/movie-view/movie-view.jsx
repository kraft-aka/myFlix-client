import React from "react";
import PropTypes from "prop-types";

import { Link } from 'react-router-dom';

import { Card, Button } from "react-bootstrap";

export class MovieView extends React.Component {

  render() {
    const { movie, onBackClick } = this.props;

    return (
      <Card>
        <div className="movie-view">
        <div className="movie-poster">
          < Card.Img src={movie.ImagePath} />
        </div>
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
          <Link to ={`/genres/${movie.Genre.Name}`}>
            <Button variant="link">Genre</Button>
          </Link>
        </div>
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
          <Link to ={ `/directors/${movie.Director.Name}`}>
            <Button variant="link">Director</Button>
          </Link>
        </div>
        <Button variant="info"
          onClick={() => {
            onBackClick(null);
          }}
        >
          Back
        </Button>
      </div>
      </Card>
    );
  }
}

MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }) 
  }).isRequired,
};