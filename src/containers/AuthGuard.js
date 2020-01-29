import React, { useEffect, useState, useContext } from 'react'
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';

import { getToken, removeToken } from "../utils/common";
import { HeaderUnauth } from '../components/HeaderUnauth';

const AuthGuard = observer(({ history, children }) => {

    const [loggedin, setLoggedin] = useState(false)
    const [loader, setLoader] = useState(true)
    const rootStoreContext = useContext(RootStoreContext);
    const { userStore } = rootStoreContext;

    useEffect(() => {
        const token = getToken()
        if (!token) {
            setLoader(false)
            // history.push("/auth");
            return
        }
        getUser(token)
            .then((user) => {
                userStore.setUser(user)
                setLoggedin(userStore.isLoggedin);
                setLoader(false)
            })
            .catch((err) => {
                console.log(err);
                setLoader(false)
                removeToken()
                // history.push("/auth");
            });
    }, [userStore.isLoggedin])

    return (
        <>
            {!loader && children}
        </>
    )
})

export { AuthGuard }