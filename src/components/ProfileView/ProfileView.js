import React,{useState} from 'react';

import { Button } from '../Button'

function ProfileView({ user, loading, error, onSubmit }) {

    const [userState, setUserState] = useState({
        email: user.email,
        name: user.name,
        username: user.username,
        role: user.role,
    });

    const formSubmit = (event) => {
        event.preventDefault();
        const {name, username} = {...userState}
        onSubmit({name, username});
    }

    return (
        <div className="container signup-container pt5">
            <div className="col-sm-12 col-md-9 col-lg-9">
                <h4>Personal Info</h4>
                <form onSubmit={formSubmit}>
                    <div className="form-group">
                        <label htmlFor="profile-email">Email address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="profile-email"
                            aria-describedby="emailHelp"
                            placeholder="Enter email"
                            value={userState.email}
                            readOnly
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="profile-name"
                            placeholder="Name"
                            value={userState.name}
                            onChange={({ target }) => setUserState({...userState,name:target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profile-username">Username</label>
                        <input
                            type="text"
                            className="form-control"
                            id="profile-username"
                            placeholder="Username"
                            value={userState.username}
                            onChange={({ target }) => setUserState({...userState,username:target.value})}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="profile-role">User Role</label>
                        <input
                            type="text"
                            className="form-control"
                            id="profile-role"
                            aria-describedby="roleHelp"
                            placeholder="Enter role"
                            value={userState.role}
                            readOnly
                        />
                    </div>
                    {error && (<div className="alert alert-danger" role="alert">
                        {error.message}
                    </div>)}
                    <div className="pt-2">
                        <Button type="submit" loading={loading} onClick={console.log}>Submit</Button>
                    </div>
                </form >
            </div>
        </div>
    )
}

export { ProfileView }