import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Badge, Container } from "react-bootstrap";
import axios from "axios";
import { Link } from "react-router-dom";
import "./movie-card.scss";
export class MovieCard extends React.Component {
  handleAddMovie(movieId) {
    const loggedUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');
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
      <Container className="d-flex mt-4">
        <Card
          className="shadow-sm bg-white rounded d-flex justify-content center mb-2 mt-2"
          style={{ height: "800px" }}
        >
          <Card.Img variant="top" width={"10rem"} src={movie.ImagePath} />
          <Badge bg="light" className="movie-card--badge" variant="primary">
            {movie.Genre.Name}
          </Badge>
          <Card.Body className="text-center">
            <Card.Title className="card-title--main text-main">{movie.Title}</Card.Title>
            <Card.Text className="movie-description">
              {movie.Description}
            </Card.Text>
          </Card.Body>
          <Container className="d-flex justify-content">
            <Link to={`/movies/${movie._id}`}>
            <Button className="card-btn mr-3 mb-3" variant="outline-success">Open</Button>
          </Link>
          <Button
              className="card-btn ml-3 mb-3"
              variant="outline-info"
              onClick={() => this.handleAddMovie(movie._id)}
            >
              Add
            </Button>
            </Container>
        </Card>
      </Container>
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