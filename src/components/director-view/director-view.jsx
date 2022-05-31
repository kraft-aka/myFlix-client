import React from "react";

import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    console.log(director.Name)

    return (
      <Container className="director-view d-flex justify-content">
        <Card className='d-sm-flex-justify-content'>
          <Card.Text>Title:</Card.Text>
          <Card.Title className="director-view text-center">{director.Name}</Card.Title>
          <Card.Text>Bio:</Card.Text>
          <p>{director.Bio}</p>
          <Card.Text>Birth:</Card.Text>
          <p>{director.Birth}</p>
          <Card.Text>Death:</Card.Text>
          <p>{director.Death }</p>
        </Card>
        <Container className="director-view">
          <Button className="btn" variant="success" type="submit" onClick={()=> onBackClick()}>Go back</Button>
          <Link to= {`/`}>
            <Button className="btn" variant="success" type="submit">Back to Home</Button>  
          </Link> 
        </Container>
      </Container>
    )
  }
}