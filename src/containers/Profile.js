import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { updateUser } from '../utils/auth';

import { ProfileView } from "../components/ProfileView";

const ProfilePage = observer(({ history }) => {

    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoader] = useState(false);
    const rootStoreContext = useContext(RootStoreContext);
    const { userStore } = rootStoreContext;

    useEffect(() => {
        setUser(userStore.user)
    }, [userStore.isLoggedin])

    const handleOnSubmit = async (newUser) => {
        try {
            setLoader(true)
            const createdUser = await updateUser({ ...newUser, uid: user.uid });
            setLoader(false)
        } catch (err) {
            setError(err);
            setLoader(false)
        }
    }

    return (
        <div>
            {user && <ProfileView onSubmit={handleOnSubmit} error={error} loading={loading} user={user} />}
        </div>
    )
})

export { ProfilePage }