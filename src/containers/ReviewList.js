import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { fetchProductReviews } from '../utils/crud';

import { ReviewListView } from "../components/ReviewListView";
import { Loader } from "../components/Loader";

const ReviewList = observer(({ history, match }) => {

    const [error, setError] = useState(null);
    const [loading, setLoader] = useState(true);
    const [reviews, setReviews] = useState(null)
    const rootStoreContext = useContext(RootStoreContext);
    const { productStore, userStore } = rootStoreContext;

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

    if (loading) {
        return (
            <div className="w-100 d-flex justify-content-center pt5">
                <Loader type="large" />
            </div>
        )
    }
    return (
        <div className="w-100 d-flex justify-content-center pt5">
            {reviews && <ReviewListView reviews={reviews} />}
        </div>
    )
})

export { ReviewList }