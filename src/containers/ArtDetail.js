import React, { useContext, useState, useEffect, useParams } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';
import { fetchProductDetailById } from '../utils/crud';

import { ArtDetailView } from "../components/ArtDetailView";
import { Loader } from "../components/Loader";

export const ArtDetailPage = ({ history, match }) => {

    const [error, setError] = useState(null);
    const [loading, setLoader] = useState(true);
    const [product, setProduct] = useState(null)
    const rootStoreContext = useContext(RootStoreContext);
    const { userStore } = rootStoreContext;

    useEffect(() => {
        let mounted = true;
        let { id } = match.params;
        const productFetcher = async (id) => {
            try {
                const prod = await fetchProductDetailById(id)
                setLoader(false)
                setProduct(prod)
            } catch (err) {
                console.log(err)
                setLoader(false)
            }
        }
        productFetcher(id)
        return () => {
            mounted = false
        }
    }, [])

    return (
        <div className="w-100 d-flex justify-content-center">
            {product && <ArtDetailView product={product} />}
            {
                loading && <Loader type="large" />
            }
        </div>

    )
}