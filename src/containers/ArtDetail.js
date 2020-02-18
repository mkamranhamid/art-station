import React, { useContext, useState, useEffect, useParams } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';
import { fetchProductDetailById, fetchProductReviews } from '../utils/crud';

import { ArtDetailView } from "../components/ArtDetailView";
import { Loader } from "../components/Loader";

export const ArtDetailPage = observer(({ history, match }) => {

    const [error, setError] = useState(null);
    const [loading, setLoader] = useState(true);
    const [product, setProduct] = useState(null)
    const [reviews, setReviews] = useState(null)
    const rootStoreContext = useContext(RootStoreContext);
    const { userStore, appCartStore } = rootStoreContext;

    useEffect(() => {
        let mounted = true;
        let { id } = match.params;
        const productFetcher = async (id) => {
            try {
                const prod = await fetchProductDetailById(id)
                setLoader(false)
                setProduct({ ...prod, id })
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

    useEffect(() => {
        let { id } = match.params;
        const productReviewsFetch = async (id) => {
            try {
                const fetched_reviews = await fetchProductReviews(id)
                setReviews(fetched_reviews)
                setLoader(false)
            } catch (err) {
                console.log(err)
                setLoader(false)
            }
        }
        productReviewsFetch(id)
    }, [])

    const handleAddToCard = ({ image, price, title, id, uid }) => {
        let cartPayload = {
            cartQty: 1,
            product: {
                id,
                image,
                price,
                title,
                productUUID: uid
            }
        }
        // cartStore.addCart(cartPayload);
        appCartStore.addCart(cartPayload)
    }

    return (
        <div className="w-100 d-flex justify-content-center pt-5">
            {product && <ArtDetailView
                product={product}
                onCartAdd={handleAddToCard}
                reviews={reviews}
            />}
            {
                loading && <Loader type="large" />
            }
        </div>
    )
})