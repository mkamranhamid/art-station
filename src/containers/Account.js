import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';

import { AccountView } from "../components/AccountView";

const AccountPage = observer(({ history }) => {

    const rootStoreContext = useContext(RootStoreContext);
    const { userStore } = rootStoreContext;

    useEffect(() => {
    }, [])

    const handleRouteTo = (where) => {
        history.push(where);
    }

    return (
        <div>
            <AccountView routeTo={handleRouteTo} />
        </div>
    )
})

export { AccountPage }