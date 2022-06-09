import React from "react";

import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    console.log(director.Name)

    return (
      <Container className="director-view d-flex justify-content mt-5">
        <Card className='d-sm-flex-justify-content'>
          <Card.Title className="director-view text-center m-3">{director.Name}</Card.Title>
          <Card.Text className="director-bio ml-3">Bio:</Card.Text>
          <p className="director-text--bio ml-3">{director.Bio}</p>
          <Card.Text className="director-birth ml-3">Birth:</Card.Text>
          <p className="director-birth--text ml-3">{director.Birth}</p>
          <Card.Text className="director-death ml-3">Death:</Card.Text>
          <p className="director-death--text ml-3">{director.Death }</p>
        </Card>
        <Container className="director-view">
          <Button className="btn" variant="outline-success m-3" type="submit" onClick={()=> onBackClick()}>Go back</Button>
          <Link to= {`/`}>
            <Button className="btn" variant="outline-success m-3" type="submit">Back to Home</Button>  
          </Link> 
        </Container>
      </Container>
    )
  }
}