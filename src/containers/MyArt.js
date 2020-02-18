import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { fetchAllProductsByUID, removeProductById } from '../utils/crud';

import { MyArtView } from "../components/MyArtView";
import { Loader } from "../components/Loader";

const MyArtPage = observer(({ history }) => {

    const [products, setProducts] = useState(null);
    const [role, setRole] = useState('user');
    const [error, setError] = useState(null);
    const [loading, setLoader] = useState(true);
    const rootStoreContext = useContext(RootStoreContext);
    const { productStore, userStore } = rootStoreContext;

    useEffect(() => {
        if (!userStore.user) return;
        fetchAllProductsByUID(userStore.user.uid)
            .then((prods) => {
                productStore.setProductsByUID(prods)
                setProducts(productStore.productsByUID)
                setLoader(false)
            })
            .catch((err) => {
                console.log(err);
                setLoader(false)
            });

        return () => {
            productStore.refreshProductsByUID()
        }
    }, [])

    useEffect(() => {
        if (!userStore.user) return;
        setProducts(productStore.productsByUID)
    }, [productStore.productsByUID.length])

    useEffect(() => {
        if (!userStore.user) return;
        setRole(userStore.user.role)
    }, [userStore.isLoggedin])

    const handleEditAction = (act, prodId) => {
        history.push(`/account/edit-art/${prodId}`);
    }

    const handleShowReviewList = (act, prodId) => {
        history.push(`/account/reviews/${prodId}`);
    }
    const handlenRemove = async (modalData) => {
        console.log(modalData);
        try {
            let productDeleted = await removeProductById(modalData.product_id)
            console.log('deleted')
            productStore.removeProductByIndex(modalData.product_index)
        } catch (err) {
            console.log(err);
        }

    }

    if (loading) {
        return (
            <div className="w-100 d-flex justify-content-center pt5">
                <Loader type="large" />
            </div>
        )
    }
    return (
        <div className="w-100 d-flex justify-content-center pt5">
            {products && <MyArtView
                products={products}
                onEdit={handleEditAction}
                onRemove={handlenRemove}
                onShowReviews={handleShowReviewList}
            />}
        </div>
    )
})

export { MyArtPage }