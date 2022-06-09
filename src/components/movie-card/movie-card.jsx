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

    axios.post(`https://movie-api-1112.herokuapp.com/users/${loggedUser}/movies/${movieId}`, {}, {
      headers: { Authorization: `Bearer ${token}` }, 
    }).then((response)=> {
      console.log(response.data);
      alert(`${movieId} has been added to Favorite Movies`)
    }).catch((error)=> console.log(error));
  }


  render() {
    const { movie } = this.props;

    return (
      <Container className="d-flex">
        <Card className="shadow-sm bg-white rounded d-flex justify-content center mb-2 mt-2">
          <Card.Img variant="top" width={"10rem"} src={movie.ImagePath} />
          <Badge bg="light" className="mb-1" variant="primary">
            {movie.Genre.Name}
          </Badge>
          <Card.Body className="text-center">
            <Card.Title className="text-main">{movie.Title}</Card.Title>
            <Card.Text className="movie-description">{movie.Description}</Card.Text>
          </Card.Body>
          <Link to={`/movies/${movie._id}`}>
            <Button variant="outline-success">Open</Button>
          </Link>
          <>  
            <Button className="btn" variant="outline-info" onClick={()=> this.handleAddMovie(movie._id)}>Add</Button>
          </>
         
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
