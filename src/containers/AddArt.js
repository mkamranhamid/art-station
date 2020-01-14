import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';
import { uploadArt } from '../utils/crud';

import { AddArtView } from "../components/AddArtView";

const AddArtPage = observer(({ history }) => {

    const rootStoreContext = useContext(RootStoreContext);
    const { userStore } = rootStoreContext;
    const [error, setError] = useState(null);
    const [loading, setLoader] = useState(false);

    const handleOnPress = async (data) => {
        try {
            setLoader(true)
            console.log("handleOnPress: ", userStore.user.uid)
            const uploadedArt = await uploadArt(data, userStore.user.uid);
            setLoader(false)
            history.push('/home')
        } catch (err) {
            console.log("ERRR: ", err)
            setLoader(false)
        }
    }

    return (
        <div>
            <AddArtView onSubmit={handleOnPress} error={error} loading={loading} />
        </div>
    )
})

export { AddArtPage }