import React, {useState, useEffect} from "react";

import axios from "axios";
import { Container } from "react-bootstrap";


export function UserUpdate (props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday ] = useState('');
  const [ favoriteMovies, setFavoriteMovies ] = useState([]);

  const loggedUser = localStorage.getItem('user');
  const token = localStorage.getItem('token')

  const getUser = () => {
    axios
      .get(`https://movie-api-1112.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}`}, 
      })
        .then((response) => {
          //console.log(response.data);
          console.log('++++++++++')
          Username: username.response.data;
          Password: password.response.data;
          Email: email.response.data;
          birthday: birthday.response.data;
        })
        .catch((error) => console.log(error));
  }

  const handleChange = () => {
    axios
      .put(`https://movie-api-1112.herokuapp.com/user-update/${user}`, {
        headers: { Authorization: `Bearer ${token}`}, 
      })
      .then((response)=> {
        console.log(response.data)
      })
  }

  return(
    <div>Hello World</div>
  )
}