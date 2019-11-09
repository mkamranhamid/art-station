import React, { useState } from "react";

function Signin({ }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formSubmit = (event) => {
        event.preventDefault();
        console.log({ email, password });
    }

    return (
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
                <div className="pt-2">
                    <button type="submit" className="btn btn-mkh w-100">Submit</button>
                </div>
            </form >
        </div>
    )
}

export { Signin }