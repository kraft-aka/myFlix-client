import React from "react";

import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;
    console.log(genre)

    return (
      <Container className="genre-view">
        <Card className='d-sm-flex-justify-content'>
          <Card.Text>Title:</Card.Text>
          <Card.Title className="genre-view text-center">{genre.Name}</Card.Title>
          <Card.Text>Description:</Card.Text>
          <p>{genre.Description}</p>
        </Card>
        <Container className="genre-view">
          <Button className="btn ml-3" variant="outline-success" type="submit" onClick={()=> onBackClick()}>Go back</Button>
          <Link to= {`/`}>
            <Button className="btn" variant="success" type="submit">Back to Home</Button>  
          </Link> 
        </Container>
      </Container>
    )
  }
}