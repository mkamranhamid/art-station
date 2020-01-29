import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { fetchAllUsers } from '../utils/crud';
import { updateUser } from '../utils/auth';

import { UsersListView } from "../components/UsersListView";
import { Loader } from "../components/Loader";

const UsersPage = observer(({ history }) => {

    const [users, setUsers] = useState(null);
    const [role, setRole] = useState('user');
    const [error, setError] = useState(null);
    const [loading, setLoader] = useState(true);
    const rootStoreContext = useContext(RootStoreContext);
    const { userStore } = rootStoreContext;

    useEffect(() => {
        if (!userStore.user) return;
        fetchAllUsers(userStore.user.uid)
            .then((usrs) => {
                userStore.setUsers(usrs)
                setUsers(usrs)
                setLoader(false)
            })
            .catch((err) => {
                console.log(err);
                setLoader(false)
            });
    }, [userStore.isLoggedin])

    const handleOnStatusChange = async (status, userId, ind) => {
        setLoader(true)
        console.log("handleOnStatusChange: USER: ", status);
        let newUsers = [...users];
        newUsers[ind].status = status;
        const createdUser = await updateUser({ ...newUsers[ind] });
        setLoader(false)
        setUsers(newUsers)
    }

    return (
        <div className="w-100 d-flex justify-content-center">
            {users && <UsersListView users={users} onStatusChange={handleOnStatusChange} />}
            {
                loading && <Loader type="large" />
            }
        </div>
    )
})

export { UsersPage }