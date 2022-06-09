import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Badge, Container } from "react-bootstrap";
import axios from "axios";

import { Link } from "react-router-dom";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  handleAddMovie(movieId) {
    const loggedUser = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .post(
        `https://movie-api-1112.herokuapp.com/users/${loggedUser}/movies/${movieId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
        alert(`${movieId} has been added to Favorite Movies`);
      })
      .catch((error) => console.log(error));
  }

  render() {
    const { movie } = this.props;

    return (
      // <Container className="d-flex">
        <Card className="h-100 shadow-sm bg-white rounded d-flex justify-content center">
          <Card.Img variant="top" width={"10rem"} src={movie.ImagePath} />
          <Badge bg="light" className="card-badge mb-1" variant="primary">
            {movie.Genre.Name}
          </Badge>
          <Card.Body className="text-center">
            <Card.Title className="text-main">{movie.Title}</Card.Title>
            <Card.Text className="movie-description">
              {movie.Description}
            </Card.Text>
          </Card.Body>
          <Container className="d-flex">
          <Link to={`/movies/${movie._id}`}>
            <Button variant="outline-success m-3" style={{width: '100px'}} >Open</Button>
          </Link>
          <Button
            className="btn" style={{width: '100px'}}
            variant="outline-info m-3"
            onClick={() => this.handleAddMovie(movie._id)}
          >
            Add
          </Button>
          </Container>
          

          
        </Card>
      // </Container>
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
