import { Navbar, Nav, Container } from 'react-bootstrap';
import React, {useContext} from 'react';
import { Switch, Route, Link } from "react-router-dom";

const Navigation = () => {
    return (
        <Navbar collapseOnSelect fix = 'top' expand='lg' bg='dark' variant ='dark'>
            <Container>
                <Navbar.Toggle aria-controls='responsive-navbar-nav' />
                <Navbar.Collapse id='responsive-navbar-nav'>
                <Nav>
                    <Link className={"nav-link"} to={"/"}>Login</Link>
                    <Link className={"nav-link"} to={"/signup/"}>Signup</Link>
                    <Link className={"nav-link"} to={"/board/"}>Board</Link>
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
    );
}

export default Navigation;