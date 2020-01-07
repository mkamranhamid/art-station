import React, { useState } from "react";

function Signin({ onSuccess, error, loading }) {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const formSubmit = (event) => {
        event.preventDefault();
        onSuccess({ email, password });
    }

    return (
        <div className="signup-container">
            <div className="col-sm-12 col-md-9 col-lg-9">
                <h1>Sign in</h1>
                <p>Lorem ipsum dolar sit lorem ipsum dolar sit </p>
                <form onSubmit={formSubmit}>
                    <div className="form-group">
                        <label htmlFor="login-email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="login-email"
                            aria-describedby="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={({ target }) => setEmail(target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="login-pwd">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="login-pwd"
                            aria-describedby="password"
                            placeholder="Password"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                            required
                        />
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

export { Signin }