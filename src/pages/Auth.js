import React, { useContext } from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';

import { Signup } from '../components/Signup';
import { Signin } from '../components/Signin';

const AuthPage = observer(() => {

    const rootStoreContext = useContext(RootStoreContext);
    const counterStore = rootStoreContext.userStore;

    return (
        <div className="auth-container row m-0">
            {/* <Signup /> */}
            {/* <Signin /> */}
            <div className="col-sm-12 col-md-6 col-lg-6 left p-0">
                <img src={`${process.env.PUBLIC_URL}/images/paint.jpg`} />
            </div>
            <div className="col-sm-12 col-md-6 col-lg-6 right">
                <p className="text-right">already have an account? <a href={'false'}>log in</a> </p>
                <div className="signup-container">
                    <Signin />
                </div>
            </div>
        </div>
    )
})
export { AuthPage }