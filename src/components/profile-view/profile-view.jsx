import React from "react";
import { Form, Button, Card, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import axios from "axios";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      username: null,
      password: null,
      email: null,
      birthday: null,
      favoriteMovies: [],
    };
    this.removeFavMovie = this.removeFavMovie.bind(this);
    this.setUsername = this.setUsername.bind(this);
  }

  getUser(token) {
    let user = localStorage.getItem("user");
    axios
      .get(`https://movie-api-1112.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        this.state = {
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
          favoriteMovies: response.data.favoriteMovies,
        };
      })
      .catch((error) => {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    this.getUser(accessToken);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
    window.open("/", "_self");
  }

  profileEdit = (e) => {
    e.prevent.default();
    let user = localStorage.getItem("user");
    let token = localStorage.getItem("token");
    let updateUser = this.state.username;

    axios
      .put("https://movie-api-1112.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` },
        username: this.state.username,
        password: this.state.password,
        email: this.state.password,
        birthday: this.state.birthday,
        favoriteMovies: this.state.favoriteMovies,
      })
      .then((response) => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
          favoriteMovies: response.data.favoriteMovies,
        });
        localStorage.setItem("user", this.state.username);
        alert("Profile updated!");
        window.open("/", "_self");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  deleteProfile() {
    const username = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    axios
      .delete(`https://movie-api-1112.herokuapp.com/users/${username}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
        alert("Profile deleted!");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      })
      .catch((error) => console.log(error));
  }

  setUsername(e) {
    this.setState({
      username: e.target.value, 
    });
  }

  setPassword(value) {
    this.setState({
      password: value,
    });
  }

  setEmail(value) {
    this.setState({
      email: value,
    });
  }

  setBirthday(value) {
    this.setState({
      birthday: value,
    });
  }

  removeFavMovie() {
    const user = localStorage.getItem('user');
    const token = localStorage.getItem('token');
    const id = this.state.favoriteMovies;

    axios.delete(`https://movie-api-1112.herokuapp.com/users/${user}/favoriteMovies/${id}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(response => {
      console.log(response.data);
      alert('Movie removed from Favorite Movies');
      window.open(`/movies/${id}`, '_self');
    })
    .catch(error => console.log(error))
  }

  render () {
    const { movies } = this.props;
    const { favoriteMovies, user } = this.state;

    if (!user) return <div className="main-view" />

    return(
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Body>
                <Form className="update-user-form" onSubmit={(e)=> this.profileEdit(e, this.username,this.password, this.email, this.birthday)} >
                <React.Fragment>
                  <UserDatilsView />
                  <Container className="flex-item">
                    <React.Fragment className="d-flex-column">
                      <Form.Control
                       type="text" name='username' placeholder="new username" onChange={this.setUsername} required/>
                     
                    <Form.Text>
                      Username must have at least 5 characters
                    </Form.Text> 
                    </React.Fragment>
                    <React.Fragment className="d-flex-column">
                      <Form.Control 
                      type="password" name="password" placeholder="new password" onChange={(e)=> this.setPassword(e.target.value)}/>
                      <Form.Text>
                        Password must be at least 4 characters long  
                      </Form.Text>  
                    </React.Fragment>
                    <React.Fragment className="d-flex-column">
                      <Form.Control 
                      type="email" name="email" placeholder="new email" onChange={(e)=> this.setEmail(e.target.value)}/>
                      <Form.Text>
                        Email must be valid email  
                      </Form.Text>  
                    </React.Fragment>
                    <React.Fragment className="d-flex-column">
                      <Form.Control 
                      type="text" name="birthday" placeholder="new dates" onChange={(e)=> this.setBirthday(e.target.value)}/>
                      <Form.Text>
                        Birthday must follow this layout d/m/y  
                      </Form.Text>  
                    </React.Fragment>
                  </Container>
                </React.Fragment>
                <React.Fragment className="mt-2 text-center">
                  <Button variant="success" type="submit" onClick={this.profileEdit}>Update User's Profile</Button>
                </React.Fragment>
                </Form>
              </Card.Body>
            </Card>
            <Card>
              <React.Fragment className="p-1 text-center ">
                <Button className="custom-btn-delete " variant="warning" type="submit" onClick={this.deleteProfile}>Delete User's Profile</Button>
              </React.Fragment>
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Body>
            { favoriteMovies.length === 0 && ( <div className="text-center"><h2>Favorite Movies is empty!</h2>
            <p>Go to the 
              <Link to={`/`}>
                <Button className="custom-btn " type="submit">Movies</Button></Link>to look for</p></div>)}
                <Row className="d-flex justify-content-around">
                  { favoriteMovies.length > 0 && movies.map((movie) => {
                    if (movie.id === favoriteMovies.find((el)=> el === movie._id)
                    ){ return (
                      <Card className="favorite-movie m-2" key={movie._id}>
                        <Link to= {`/movies/${movie._id}`}>
                          <Card.Img variant="top" src={movie.ImagePath} className="image-responsive" />
                        </Link>
                        
                        <Card.Body>
                          <Card.Title>{movie.Title}</Card.Title>
                         
                          <Button className="custom-btn" variant="danger" onClick={this.removeFavMovie}>Remove from Favorites</Button>
                        </Card.Body>
                      </Card>
                    
                    );
                  }
                  })}
                </Row>
          </Card.Body>
        </Card>
      </Container>
    )
  }
}
