import React from "react";

import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

export class GenreView extends React.Component {
  render() {
    const { genre, onBackClick } = this.props;
    console.log(genre)

    return (
      <Container className="genre-view mt-5">
        <Card className='d-sm-flex-justify-content'>
          <Card.Title className="genre-view text-center m-3">{genre.Name}</Card.Title>
          <Card.Text className="m-3">Description:</Card.Text>
          <p className="genre-description m-3">{genre.Description}</p>
          <Container className="genre-view">
          <Button className="genre-btn m-3" variant="outline-success" type="submit" onClick={()=> onBackClick()}>Go back</Button>
          <Link to= {`/`}>
            <Button className="genre-btn m-3" variant="outline-success" type="submit">Back to Home</Button>  
          </Link> 
        </Container>
        </Card>
        
      </Container>
    )
  }
}