import React from "react";

import { Link } from "react-router-dom";
import { Container } from "react-bootstrap";

export class GenreView extends React.Component {
  render() {
    const {movie, onBackClick } = this.props;
    console.log(movie)

    return (
      <Container className="genre-view">
        <Card className='d-sm-flex-justify-content'>
          <Card.Text>Title:</Card.Text>
          <Card.Title className="genre-view text-center">{movie.Genre.Name}</Card.Title>
          <Card.Text>Description:</Card.Text>
          <p>{movie.Genre.Description}</p>
        </Card>
        <Container className="genre-view">
          <Button className="btn" variant="success" type="submit" onClick={()=> onBackClick()}>Go back</Button>
          <Link to= {`/`}>
            <Button className="btn" variant="success" type="submit">Back to Home</Button>  
          </Link> 
        </Container>
      </Container>
    )
  }
}