import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { fetchAllProducts, updateArt } from '../utils/crud';

import { ProductsListView } from "../components/ProductsListView";
import { Loader } from "../components/Loader";

const ProductsPage = observer(({ history }) => {

    const [products, setProducts] = useState(null);
    const [loading, setLoader] = useState(true);
    const rootStoreContext = useContext(RootStoreContext);
    const { productStore, userStore } = rootStoreContext;

    useEffect(() => {
        if (!userStore.user) return
        fetchAllProducts()
            .then((prods) => {
                productStore.setAllProducts(prods)
                setProducts(prods)
                setLoader(false)
            })
            .catch((err) => {
                console.log(err);
                setLoader(false)
            });
    }, [userStore.isLoggedin])


    const handleOnStatusChange = async (status, userId, ind) => {
        setLoader(true)
        let newProducts = [...products];
        newProducts[ind].status = status;
        const createdUser = await updateArt({ ...newProducts[ind] }, newProducts[ind].id);
        setLoader(false)
        setProducts(newProducts)
    }

    return (
        <div className="w-100 d-flex justify-content-center">
            {products && <ProductsListView products={products} onStatusChange={handleOnStatusChange} />}
            {
                loading && <Loader type="large" />
            }
        </div>
    )
})

export { ProductsPage }