import React from "react";

import { Container } from "react-bootstrap";

export class GenreView extends React.Component {
  render() {
    const {movie} = this.props;

    return (
      <Container>
        <Card>
          <Card.Title className="genre-view text-center">{movie.Genre.Name}</Card.Title>
        </Card>
        <Card.Body>{movie.Genre.Description}</Card.Body>
      </Container>
    )
  }
}