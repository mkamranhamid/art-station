import React, { useState } from "react";
import { Dropdown } from 'react-bootstrap';

function Signup({ onSuccess, error, loading }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [role, setRole] = useState('user');

    const roles = [
        { id: 0, title: 'user' },
        { id: 1, title: 'artist' },
    ]

    const formSubmit = (event) => {
        event.preventDefault();
        console.log({ email, password, name, username, role });
        onSuccess({ email, password, name, username, role });
    }

    return (
        <div className="signup-container">
            <div className="col-sm-12 col-md-9 col-lg-9">
                <h1>Sign up</h1>
                <p>Lorem ipsum dolar sit lorem ipsum dolar sit </p>
                <form onSubmit={formSubmit}>
                    <div className="form-group">
                        <label htmlFor="register-email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="register-email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                        />
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-pwd">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="register-pwd"
                            placeholder="Password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="register-name"
                            placeholder="Name"
                            value={name}
                            onChange={({ target }) => setName(target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="register-username"
                            placeholder="Username"
                            value={username}
                            onChange={({ target }) => setUsername(target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="register-role">Select role which best describes you.</label>
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                {role}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    roles.map((d) => (
                                        <Dropdown.Item
                                            key={d.id}
                                            href={false}
                                            eventKey={d.id}
                                            onSelect={(eKey) => setRole(d.title)}>
                                            {d.title}
                                        </Dropdown.Item>
                                    ))
                                }

                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {error && (<div className="alert alert-danger" role="alert">
                        {error.message}
                    </div>)}
                    <div className="pt-2">
                        <button type="submit" disabled={loading} className="btn btn-mkh w-100">Submit</button>
                    </div>
                </form >
            </div>
        </div>
    )
}

export { Signup }