import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';

import { setToken } from '../utils/common';
import { createUser, login } from '../utils/auth';

import { Signup } from '../components/Signup';
import { Signin } from '../components/Signin';

const AuthPage = observer((props) => {

    const rootStoreContext = useContext(RootStoreContext);
    const counterStore = rootStoreContext.userStore;
    const [view, setView] = useState('signin');
    const [error, setError] = useState(null);
    const [loading, setLoader] = useState(false);

    const changeView = (event, viewTo) => {
        event.preventDefault();
        setError(null)
        setView(viewTo);
    }

    const routeTo = (route) => {
        setToken('token:secret');
        props.history.replace('home');
    }

    const onSignup = async (newUser) => {
        try {
            setLoader(true)
            const createdUser = await createUser(newUser);
            setView('signin');
            setLoader(false)
        } catch (err) {
            setError(err);
            setLoader(false)
        }
    }

    const onSignin = async (credentials) => {
        try {
            setLoader(true)
            const user = await login(credentials);
            setLoader(false)
            routeTo('home');
        } catch (err) {
            setError(err);
            setLoader(false)
        }
    }

    return (
        <div className="auth-container row m-0">
            <div className="col-sm-12 col-md-6 col-lg-6 left p-0">
                <img src={`${process.env.PUBLIC_URL}/images/paint.jpg`} />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 right">
                {
                    view == 'signin' ?
                        <>
                            <p className="p-3">don't have an account? <a href={'false'} onClick={(event) => changeView(event, 'signup')}>sign up</a> </p>
                            <Signin onSuccess={onSignin} error={error} loading={loading} />
                        </>
                        : <>
                            <p className="p-3">already have an account? <a href={'false'} onClick={(event) => changeView(event, 'signin')}>sign in</a> </p>
                            <Signup onSuccess={onSignup} error={error} loading={loading} />
                        </>
                }
            </div>
        </div>
    )
})
export { AuthPage }