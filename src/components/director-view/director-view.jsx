import React from "react";

import { Link } from "react-router-dom";
import { Container, Card, Button } from "react-bootstrap";

export class DirectorView extends React.Component {
  render() {
    const { director, onBackClick } = this.props;
    console.log(director.Name);

    return (
      <Container className="director-container mt-5">
        <Card className="d-sm-flex-justify-content">
          <Card.Body>
            <Card.Title className="director-view text-center m-3">
              {director.Name}
            </Card.Title>
            <Card.Text className="director-bio ml-3">Bio:</Card.Text>
            <p className="director-text--bio ml-3 text-main">{director.Bio}</p>
            <Card.Text className="director-birth--text ml-3">
              Birth: <span className="text-main">{director.Birth}</span>
            </Card.Text>
            <Card.Text className="director-death ml-3">
              Death: <span className="text-main">{director.Death}</span>
            </Card.Text>
          </Card.Body>
          <Container className="director-view">
            <Button
              className="btn"
              variant="outline-success m-3"
              type="submit"
              onClick={() => onBackClick()}
            >
              Go back
            </Button>
            <Link to={`/`}>
              <Button
                className="btn"
                variant="outline-success m-3"
                type="submit"
              >
                Back to Home
              </Button>
            </Link>
          </Container>
        </Card>
      </Container>
    );
  }
}
