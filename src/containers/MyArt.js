import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { fetchAllProductsByUID } from '../utils/crud';

import { MyArtView } from "../components/MyArtView";
import { Loader } from "../components/Loader";

const MyArtPage = observer(({ history }) => {

    const [products, setProducts] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoader] = useState(true);
    const rootStoreContext = useContext(RootStoreContext);
    const { productStore, userStore } = rootStoreContext;

    useEffect(() => {
        if (!userStore.user) return
        fetchAllProductsByUID(userStore.user.uid)
            .then((prods) => {
                productStore.setProductsByUID(prods)
                setProducts(prods)
                setLoader(false)
            })
            .catch((err) => {
                console.log(err);
                setLoader(false)
            });
    }, [userStore.isLoggedin, productStore.fetching.productByUID])

    const handleActionChange = (act, prodId) => {
        console.log("handleActionChange: ACT: ", act);
        if (act == "Edit") {
            history.push(`/account/edit-art/${prodId}`);
        }
    }

    return (
        <div className="w-100 d-flex justify-content-center">
            {products && <MyArtView products={products} onActionChange={handleActionChange} />}
            {
               loading && <Loader type="large" />
            }
        </div>
    )
})

export { MyArtPage }