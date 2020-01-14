import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';

import { getToken, removeToken } from "../utils/common";
import { HeaderUnauth } from '../components/HeaderUnauth';

const Header = observer(({ history }) => {

    const [loggedin, setLoggedin] = useState(false)
    const rootStoreContext = useContext(RootStoreContext);
    const { userStore } = rootStoreContext;

    useEffect(() => {
        setLoggedin(userStore.isLoggedin)
    }, [userStore.isLoggedin])

    const handleRouteTo = (event, where) => {
        event.preventDefault();
        if (where == "auth") {
            removeToken()
        }
        history.push(where);
    }

    const doLogout = (ev) => {
        userStore.removeUser();
        removeToken()
        history.replace('auth');
    }

    return (
        <HeaderUnauth routeTo={handleRouteTo} state={loggedin} logout={doLogout} />
    )
})

export { Header }