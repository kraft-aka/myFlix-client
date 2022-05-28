import React, { useEffect } from "react";

import { Navbar, Container, Nav, Button } from "react-bootstrap";
import './navbar.scss' 


export function MenuBar(props) {
  
  const { user } = props;

  const onLoggedOut = () => {
    console.log('onLoggedOut');
    localStorage.clear();
    window.open("/", "_self");
  };

  const isAuth = () => {
    if (typeof window == "undefined") {
      return false;
    }

    // if (localStorage.getItem("token")) {
    //   return localStorage.getItem("token");
    // } else {
    //   return false;
    // } 
    const token = localStorage.getItem('token');
    if (!token) return false;
    
    return token;
  };

  return (
    <Navbar
      className="main-view"
      sticky="top"
      bg="dark"
      expand="lg"
      variant="dark"
    >
      <Container>
        <Navbar.Brand className="navbar-logo" href="/">
          myFlixCinema
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="ml-auto">
            {isAuth() && <Nav.Link href={`/users/${user}`}>{user}</Nav.Link>}
            {isAuth() && (
              <Button
                variant="link"
                onClick={onLoggedOut}
              
            
              >
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
