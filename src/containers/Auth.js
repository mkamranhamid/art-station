import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useLocation } from "react-router-dom";

import { RootStoreContext } from '../stores/rootStore';

import { setToken, useQuery, isPending, isArtist } from '../utils/common';
import { createUser, login } from '../utils/auth';

import { Signup } from '../components/Signup';
import { Signin } from '../components/Signin';
import { Loader } from "../components/Loader";

const authRoutes = ['signin', 'signup']
const AuthPage = observer(({ history, match }) => {

    const query = useQuery();
    const qName = query.get("q");
    const rootStoreContext = useContext(RootStoreContext);
    const { userStore } = rootStoreContext;
    const [view, setView] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoader] = useState(true);

    useEffect(() => {
        const setUserView = qName && authRoutes.includes(qName) ? qName : 'signin';
        setLoader(false)
        setView(setUserView);
    }, [qName])

    const changeView = (event, viewTo) => {
        event.preventDefault();
        setError(null)
        setView(viewTo);
    }

    const routeTo = (route) => {
        history.replace('home');
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
            console.log("USER::", user)
            if (isPending(user) && isArtist(user)) {
                setError({ message: "Your request has been added to admin. Please wait for your request approval before moving forward." });
                return
            }
            userStore.setUser(user)
            setToken(user.uid)
            setLoader(false)
            routeTo('/home');
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
                            {/* <p className="p-3">don't have an account? <a data-testid="a-signup" href={'false'} onClick={(event) => changeView(event, 'signup')}>sign up</a> </p> */}
                            <Signin onSuccess={onSignin} error={error} loading={loading} />
                        </>
                        : <>
                            {/* <p className="p-3">already have an account? <a data-testid="a-signin" href={'false'} onClick={(event) => changeView(event, 'signin')}>sign in</a> </p> */}
                            <Signup onSuccess={onSignup} error={error} loading={loading} />
                        </>
                }
            </div>
        </div>
    )
})
export { AuthPage }