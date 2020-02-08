import React, { useState } from 'react';
import { Nav, Navbar, Form, NavDropdown, FormControl, Button, Dropdown } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart, faChevronDown, faCircle } from '@fortawesome/free-solid-svg-icons'

function HeaderUnauth({ user, routeTo, state, logout, cart, isTop }) {


    const handleCartClick = (event) => {
        if (!cart) return
        routeTo(event, '/cart')
    }
    return (
        <Navbar expand="lg" className={!isTop ? 'bg-white' : ''}>
            <Navbar.Brand href="#home" onClick={(event) => routeTo(event, '/home')}>
                <img src={`${process.env.PUBLIC_URL}/logo.PNG`} alt="art station" />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav" className="justify-content-end">
                <span className="fa-layers fa-fw mr-3" onClick={handleCartClick}>
                    <FontAwesomeIcon icon={faShoppingCart} size='lg' color="#363636" />
                    {cart && <span className="badge">{cart}</span>}
                </span>
                {/* <form className="form-inline my-2 my-lg-0" id="search-form">
                    <input placeholder="Search" type="search" className="search" />
                </form> */}
                {!state && <Nav className="">
                    <li className="nav-item">
                        <a className="nav-link" href="#" onClick={(event) => routeTo(event, '/auth?q=signin')}>Sign in</a>
                    </li>
                    <button className="btn btn-outline-mkh" onClick={(event) => routeTo(event, '/auth?q=signup')}>Sign up</button>
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