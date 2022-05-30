import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Badge } from "react-bootstrap";

import { Link } from "react-router-dom";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  render() {
    const { movie } = this.props;

    return (
      <Card className="h-100 shadow-sm bg-white rounded mb-2 mt-2">
        <Card.Img variant="top" width={"10rem"} src={movie.ImagePath} />
        <Badge bg="light" className="mb-1" variant="primary">
          {movie.Genre.Name}
        </Badge>
        <Card.Body className="text-center">
          <Card.Title className="text-main">{movie.Title}</Card.Title>
          <Card.Text>{movie.Description}</Card.Text>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="outline-success" >Open</Button>
          </Link>
        </Card.Body>
      </Card>
    );
  }
}

MovieCard.propTypes = {
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
