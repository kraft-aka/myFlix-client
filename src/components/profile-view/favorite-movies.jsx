import axios from "axios";
import React, {useState, useEffect} from "react";

import { Container, Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";



export function FavoriteMovies (props) {

  const { movies, favoriteMovies, loggedUser, token } = props;
  const [ isLoading, setIsLoading ] = useState(false);

  
  // create var holding an ID for each movie
  const FavId = (favoriteMovies.map(m=> m._id));
  
  

  // create a favorite movies array
  const favoriteMoviesArray = (favoriteMovies.filter(m=> FavId.includes(m._id)));
  console.log(favoriteMoviesArray);

  const handleDeleteMovie = (movieId) => {
    setIsLoading(true)
    axios.delete(`https://movie-api-1112.herokuapp.com/users/${loggedUser}/movies/${movieId}`, {
      headers: { Authorization: `Bearer ${token}` }, 
    }).then(()=> {
      console.log('Movie deleted');
      // localStorage.clear();
      alert(`${movieId} has been removed from Favorite Movies`);
      window.open(`/users/${loggedUser}`, '_self');
      setIsLoading(false);
    }).catch((error)=> console.log(error));
  }
    

  return (
    <Container className="fav-movie--container mt-3">
    { favoriteMoviesArray.length === 0 ? (
      <p className="text-center">Your Favorite Movies List is empty.</p>
    ) : (
      favoriteMoviesArray.map(movieId => {
        const movie = movies.find(m=> m._id ===movieId)
        return (
          
          <Col xs={12} md={3} lg={3} key={movie._id }>
            {/* <pre>{JSON.stringify(movie,null,2)}</pre> */}
            <Card className ="fav-movie--card " 
            style={{
              height: "30vw",
              display: "flex",
              flexDirection: "column",
            }}>
              {/* <Link to={`/movies/${movie._id}`}> */}
                <Card.Img variant="top" src={movie.ImagePath} style={{ width: "100%", height: "auto" }}/>
              {/* </Link> */}
              <Card.Body>
                <Card.Title className="text-center">{movie.Title}</Card.Title>     
              </Card.Body> 
              <Container className="d-flex justify-content space-around"> 
                <Link to={`/movies/${movie._id}`}>
                  <Button className="movie-btn mr-3 mb-3"variant="outline-success">Open</Button>
                </Link>
                <Button className="movie-btn ml-3 mb-3" variant="outline-danger" onClick={()=>handleDeleteMovie(movie._id)}>Remove</Button>
                </Container>
            </Card>
          </Col>
        )
      })
    )}
  </Container>
  )
}