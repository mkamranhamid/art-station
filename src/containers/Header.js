import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';

import { getToken, removeToken } from "../utils/common";
import { HeaderUnauth } from '../components/HeaderUnauth';

const Header = observer(({ history }) => {

    const [loggedin, setLoggedin] = useState(false)
    const [user, setUser] = useState(undefined)
    const [isTop, setIsTop] = useState(true)
    const [cartsLength, setCartsLength] = useState(0)
    const rootStoreContext = useContext(RootStoreContext);
    const { userStore, appCartStore } = rootStoreContext;

    useEffect(() => {
        setLoggedin(userStore.isLoggedin)
        setUser(userStore)
    }, [userStore.isLoggedin])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    })

    /*
        * to listen cart array 
    */
    useEffect(() => {
        setCartsLength(appCartStore.cart.length)
    }, [appCartStore.cart.length])

    const handleScroll = (e) => {

        const _isTop = window.scrollY < 70;
        if (_isTop !== isTop) {
            setIsTop(_isTop)
        }
    }
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
        <HeaderUnauth
            user={user}
            routeTo={handleRouteTo}
            state={loggedin}
            logout={doLogout}
            cart={cartsLength}
            isTop={isTop}
        />
    )
})

export { Header }