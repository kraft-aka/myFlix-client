import React, { useEffect } from "react";

import {
  Navbar,
  Container,
  Nav,
  Button,
  Form,
  FormControl,
} from "react-bootstrap";
import "./navbar.scss";

export function MenuBar(props) {
  const { user,movie,movies } = props;

  const onLoggedOut = () => {
    console.log("onLoggedOut");
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }

    const token = localStorage.getItem("token");
    if (!token) return false;

    return token;
  };

  // filter movies in searchbar ----not finished yet
  const searchMovie = (e) => {
    const movieTitle = e.target.value;
    const filterMovie = movies.filter(m => {
      m.Title.toLowerCase().includes(movieTitle);
    })
    console.log(movies); 
  }

  return (
    <Navbar
      className="main-view--navbar"
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark"
      style={{ width: "100%" }}
    >
      <Container className="fluid">
        <Navbar.Brand className="navbar-logo" href="/">
          MYFLIXCinema
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && (
              <Nav.Link href={`/users/${user}`}>My Profile</Nav.Link>
            )}
            {isAuth() && (
              <Nav.Link href={`/user-update/${user}`}>Update-Profile</Nav.Link>
            )}
            {isAuth() && (
              <Form className="d-flex">
              <FormControl
                type="search"
                placeholder="Search"
                className="me-2 ml-2 mr-4"
                aria-label="Search"
                onInputChange={()=>searchMovie(movie.Title)}
              />
              <Button className="navbar-btn mr-2" variant="outline-success">Search</Button>
            </Form>
            )}
            {isAuth() && (
              <Button variant="link" onClick={onLoggedOut}>
                Logout
              </Button>
            )}
            {!isAuth() && <Nav.Link href="/">Sign-In</Nav.Link>}
            {!isAuth() && <Nav.Link href="/register">Sign-Up</Nav.Link>}           
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
