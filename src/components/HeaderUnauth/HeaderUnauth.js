import React from 'react';
import { Nav, Navbar, Form, NavDropdown, FormControl, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function HeaderUnauth({ routeTo, state, logout }) {

    return (
        <Navbar expand="lg">
            <Navbar.Brand href="#home" onClick={(event) => routeTo(event, '/home')}>ART STATION</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <form className="form-inline my-2 my-lg-0" id="search-form">
                    <input placeholder="Search" type="search" className="search" />
                </form>
                {!state && <Nav className="">
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={(event) => routeTo(event, '/auth')}>Sign in</a>
                    </li>
                    <button className="btn btn-outline-mkh" onClick={(event) => routeTo(event, '/auth')}>Sign up</button>
                </Nav>}
                {state && <Nav className="">
                    <li className="nav-item">
                        <Link className="nav-link" to={'/account'}>Account</Link>
                    </li>
                    <button className="btn btn-outline-mkh" onClick={(event) => logout(event)}>Logout</button>
                </Nav>}
            </Navbar.Collapse>
        </Navbar>
    )
}

export { HeaderUnauth }