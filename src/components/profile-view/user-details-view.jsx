import React from "react";

import {Card, Container} from "react-bootstrap";
import axios from "axios";

export class UserDetailsView extends React.Component {
  constructor() {
    super(); 
  }
  getUser(token) {
    let user = localStorage.getItem("user");
    axios
      .get(`https://movie-api-1112.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  render () {
    const { user } = this.props;
    console.log(user);
    <Card className="shadow-sm bg-white ">
      <Card.Text>{user.username}</Card.Text>
    </Card>
  }

  
} 