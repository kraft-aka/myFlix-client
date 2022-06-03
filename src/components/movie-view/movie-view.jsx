import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";

import { Card, Button, Container } from "react-bootstrap";
import "./movie-view.scss";

export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick, addMovie } = this.props;

    return (
      <Container className="d-flex flex-wrap">
        <Card className="shadow-sm bg-white rounded" style={{ width: "40rem" }}>
          <Card.Img className="card-img" src={movie.ImagePath} />
          <Card.Body>
            <Card.Title className="text-center">Title:</Card.Title>
            <Card.Text className="h2 text-main text-center m-3">
              {movie.Title}
            </Card.Text>
            <Card.Title className="text-center">Description: </Card.Title>
            <Card.Text className="text-center">{movie.Description}</Card.Text>
            <Card.Title className="text-center">Genre: </Card.Title>
            <Card.Text className="text-center">{movie.Genre.Name}</Card.Text>
            <Card.Title className="text-center">Director: </Card.Title>
            <Card.Text className="text-center">{movie.Director.Name}</Card.Text>
            <Card.Title className="text-center">Release Year: </Card.Title>
            <Card.Text className="text-center">{movie.ReleaseYear}</Card.Text>
            <div className="container d-flex justify-content space-around">
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="outline-info ml-3 mr-3">Director</Button>
              </Link>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="outline-info ml-3 mr-3">Genre</Button>
              </Link>
              <Button variant="outline-info ml-3 mr-3" onClick={addMovie}>Add to Favorite List</Button>
            </div>
          </Card.Body>
          <Button
            variant="outline-success"
            onClick={() => {
              onBackClick(null);
            }}
          >
            Back
          </Button>
        </Card>
      </Container>
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
    }),
  }).isRequired,
};
