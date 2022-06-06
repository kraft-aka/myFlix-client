import axios from "axios";
import React, {useState, useEffect} from "react";

import { Container, Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";



export function FavoriteMovies (props) {

  const { movies, favoriteMovies, loggedUser, token } = props;

  
  // create var holding an ID for each movie
  const id = (favoriteMovies.map(m=> m._id));
  
  

  // create a favorite movies array
  const favoriteMoviesArray = (favoriteMovies.filter(m=> id.includes(m._id)));
  console.log(favoriteMoviesArray);

  const handleDeleteMovie = (movieId) => {
    axios.delete(`https://movie-api-1112.herokuapp.com/users/${loggedUser}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }, 
    }).then(()=> {
      console.log('Movie deleted');
      // localStorage.clear();
      alert(`${movieId} has been removed from Favorite Movies`);
      window.open(`/users/${loggedUser}`, '_self');
    }).catch((error)=> console.log(error));
  }
    

  return (
    <Container>
    { favoriteMoviesArray.length === 0 ? (
      <p>Your Favorite Movies List is empty.</p>
    ) : (
      favoriteMoviesArray.map(movieId => {
        const movie = movies.find(m=> m._id ===movieId)
        return (
          <Col md={3} lg={3} key={movie._id }>
            {/* <pre>{JSON.stringify(movie,null,2)}</pre> */}
            <Card id="movie-card" >
              <Link to={`/movies/${movie._id}`}>
                <Card.Img variant="top" src={movie.ImagePath}/>
              </Link>
              <Card.Body>
                <Card.Title>{movie.Title}</Card.Title>  
                <Card.Text>{movie.Description}</Card.Text> 
                <Link to={`/movies/${movie._id}`}>
                  <Button className="btn mr-3"variant="outline-success">Open</Button>
                </Link>
                <Button className="btn ml-3" variant="outline-danger" onClick={()=>handleDeleteMovie(movie._id)}>Remove</Button>
              </Card.Body> 
            </Card>
          </Col>
        )
      })
    )}
  </Container>
  )
}