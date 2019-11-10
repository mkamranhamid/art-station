import React, { useContext, useState } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';

import { Signup } from '../components/Signup';
import { Signin } from '../components/Signin';

const AuthPage = observer((props) => {

    const rootStoreContext = useContext(RootStoreContext);
    const counterStore = rootStoreContext.userStore;
    const [view, setView] = useState('signin');

    const changeView = (event, viewTo) => {
        event.preventDefault();
        setView(viewTo);
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
                            <Signin />
                        </>
                        : <>
                            <p className="p-3">already have an account? <a href={'false'} onClick={(event) => changeView(event, 'signin')}>sign in</a> </p>
                            <Signup />
                        </>
                }
            </div>
        </div>
    )
})
export { AuthPage }