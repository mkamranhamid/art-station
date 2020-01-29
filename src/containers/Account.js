import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';

import { AccountView } from "../components/AccountView";

const AccountPage = observer(({ history }) => {

    const [role, setRole] = useState('user');
    const rootStoreContext = useContext(RootStoreContext);
    const { userStore } = rootStoreContext;

    useEffect(() => {
        if (!userStore.user) return;
        setRole(userStore.user.role)
    }, [userStore.isLoggedin])

    const handleRouteTo = (where) => {
        history.push(where);
    }

    return (
        <div>
            <AccountView routeTo={handleRouteTo} role={role} />
        </div>
    )
})

export { AccountPage }