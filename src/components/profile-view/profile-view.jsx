import React from "react";
import { Form, Button, Card } from "react-bootstrap";
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
        //const data = response.data;
        this.state = {
          username: response.data.username,
          password: response.data.password,
          email: response.date.email,
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
    localStorage.removeItem('token');
    localStorage.removeItem('user')
    this.setState({
      user: null
    });
    window.open('/', '_self');
  }

  profileEdit = (e) => {
    e.prevent.default();
    let user = localStorage.getItem('user');
    let token = localStorage.getItem('token');
    let updateUser = this.state.username;

    axios.put("https://movie-api-1112.herokuapp.com/users", {
      headers: { Authorization: `Bearer ${token}` },
      username: this.state.username,
      password: this.state.password,
      email: this.state.password,
      birthday: this.state.birthday,
      favoriteMovies: this.state.favoriteMovies,
    })
      .then(response => {
        this.setState({
          username: response.data.username,
          password: response.data.password,
          email: response.data.email,
          birthday: response.data.birthday,
          favoriteMovies: response.data.favoriteMovies,
        })
      })
      .catch((error) => {
        console.log(error)
      });
  };

  

  
}

