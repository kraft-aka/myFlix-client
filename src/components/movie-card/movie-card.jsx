import React from "react";
import PropTypes from 'prop-types';
import { Button, Card, Badge } from 'react-bootstrap';


export class MovieCard extends React.Component {
  render() {
    const { movie, onMovieClick } = this.props;
    return (
     <Card className="h-100 shadow-sm bg-white rounded">
       <Card.Img variant="top" src={movie.ImagePath} />
       <Badge bg="light" className="mb-1" variant="primary">
          {movie.Genre.Name}
       </Badge>
       <Card.Body>
         <Card.Title className="text-main">{movie.Title}</Card.Title>
         <Card.Text>{movie.Description}</Card.Text>
         <Button onClick={()=> onMovieClick(movie)} variant="success">Open</Button>  
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
    }) 
  }).isRequired,
  onMovieClick: PropTypes.func.isRequired
};