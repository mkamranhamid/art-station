import React, { useContext, useState, useEffect, useParams } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';
import { fetchProductById, updateArt } from '../utils/crud';

import { AddArtView } from "../components/AddArtView";

const EditArtPage = observer(({ history, match }) => {

    const [error, setError] = useState(null);
    const [loading, setLoader] = useState(false);
    const [product, setProduct] = useState(null)
    const rootStoreContext = useContext(RootStoreContext);
    const { userStore } = rootStoreContext;

    useEffect(() => {
        let mounted = true;
        let { id } = match.params;
        const productFetcher = async (id) => {
            try {
                const prod = await fetchProductById(id)
                setProduct(prod)
            } catch (err) {
                console.log(err)
            }
        }
        productFetcher(id)
        return () => {
            mounted = false
        }
    }, [])

    const handleOnPress = async (data) => {
        try {
            setLoader(true)
            let { id } = match.params;
            let payload = { ...product, ...data }
            const uploadedArt = await updateArt(payload, id);
            setLoader(false)
            history.push('/home')
        } catch (err) {
            console.log("ERRR: ", err)
            setLoader(false)
        }
    }

    return (
        <div>
            {product && <AddArtView product={product} onSubmit={handleOnPress} error={error} loading={loading} />}
        </div>
    )
})

export { EditArtPage }