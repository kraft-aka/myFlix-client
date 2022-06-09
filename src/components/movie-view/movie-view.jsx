import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { Card, Button, Container } from "react-bootstrap";
import "./movie-view.scss";

export class MovieView extends React.Component {
  keypressCallback = (e) => console.log(e.key);
  componentDidMount() {
    document.addEventListener("keypress", this.keypressCallback);
  }
  componentWillUnmount() {
    document.removeEventListener("keypress", this.keypressCallback);
  }
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <Container className="movie-container mt-5">
        <Card
          className="shadow-sm bg-white rounded"
          style={{
            width: "60rem",
            display: "flex",
            flexDirection: "row",
            padding: "10px",
          }}
        >
          <Card.Img
            className="card-img"
            src={movie.ImagePath}
            style={{ width: "100%", height: "500px" }}
          />
          <Card.Body>
            <Card.Title className="text-center">Title:</Card.Title>
            <Card.Text
              className="h2 text-main text-center m-3 "
              style={{ color: "#333" }}
            >
              {movie.Title}
            </Card.Text>
            <Card.Title className="text-center">Description: </Card.Title>
            <Card.Text className="text-center">{movie.Description}</Card.Text>
            <Card.Title className="text-center">Genre: </Card.Title>
            <Card.Text className="text-center">{movie.Genre.Name}</Card.Text>
            <Card.Title className="text-center">Director: </Card.Title>
            <Card.Text className="text-center">{movie.Director.Name}</Card.Text>
            <Card.Title className="text-center">Release Year: </Card.Title>
            <Card.Text className="text-center">{movie.ReleaseYear}</Card.Text>
            <div className="container d-flex justify-content space-around">
              <Link to={`/directors/${movie.Director.Name}`}>
                <Button variant="outline-info ml-3 mr-3">Director</Button>
              </Link>
              <Link to={`/genres/${movie.Genre.Name}`}>
                <Button variant="outline-info  mr-3">Genre</Button>
              </Link>
              <Button
                variant="outline-success"
                style={{ width: "80%" }}
                onClick={() => {
                  onBackClick(null);
                }}
              >
                Back
              </Button>
            </div>
          </Card.Body>
        </Card>
      </Container>
    );
  }
}
MovieView.propTypes = {
  movie: PropTypes.shape({
    Title: PropTypes.string.isRequired,
    Description: PropTypes.string.isRequired,
    ImagePath: PropTypes.string.isRequired,
    Genre: PropTypes.shape({
      Name: PropTypes.string,
    }),
    Director: PropTypes.shape({
      Name: PropTypes.string,
    }),
  }).isRequired,
};