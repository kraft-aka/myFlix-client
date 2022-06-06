import axios from "axios";
import React, {useState, useEffect} from "react";

import { Container, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";



export function FavoriteMovies (props) {

  

  const {movies, loggedUser, token } = props;
  
  // create var holding an ID for each movie
  const id = (favoriteMovies && favoriteMovies.map(m=> m._id));
  

  // create a favorite movies array
  const favoriteMoviesArray =(movies && movies.filter(m=> m.includes(m._id)));
  console.log(favoriteMoviesArray);
  const handleDeleteMovie = (movieId) => {
    axios.delete(`https://movie-api-1112.herokuapp.com/users/${loggedUser}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }, 
    }).then(()=> {
      console.log('Moive deleted');
      alert(`${id} has been removed from Favorite Movies`);
      window.open('/users/:username', '_self');
    }).catch((error)=> console.log(error));
  }


  return (
    <Container>
    { favoriteMoviesArray === 0 ? (
      <p>Your Favorite Movies List is empty.</p>
    ) : (
      favoriteMoviesArray.map(movie => {
        return (
          <Col>
            <Card id="movie-card">
              <Link to={`movies/${movie._id}`}>
                <Card.Img variant="top" src={movie.ImagePath}/>
              </Link>
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>  
                <Card.Text>{movie.Description}</Card.Text> 
                <Link to={`movies/$movie._id`}>
                  <Button variant="outline-success">Open</Button>
                </Link>
                <Button className="btn" variant="outline-danger" onClick={()=>handleDeleteMovie(movie._id)}>Remove</Button>
              </Card.Body> 
            </Card>
          </Col>
        )
      })
    )}
  </Container>
  )
}