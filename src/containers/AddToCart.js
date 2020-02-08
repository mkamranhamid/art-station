import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';

import { AddToCartView } from "../components/AddToCartView";

const AddToCartPage = observer(({ history }) => {

    const rootStoreContext = useContext(RootStoreContext);
    const { appCartStore, userStore } = rootStoreContext;
    const [cart, setCart] = useState();
    const [total, setTotal] = useState();
    const [loggedin, setLoggedin] = useState(false)

    useEffect(() => {
        setCart(appCartStore.cart);
        setTotal(appCartStore.total);
        setLoggedin(userStore.isLoggedin)
    }, [appCartStore.cart.length, userStore.isLoggedin])

    const handleCheckoutClick = () => {

        if (!loggedin) {
            history.push('/auth');
            return;
        }
        history.push('/checkout');
    }

    const handleRemoveCart = (ind) => {
        console.log("handleRemoveCart: ", ind);
        appCartStore.remove(ind)
    }

    if (!cart) {
        return null
    }

    return <AddToCartView
        data={cart} total={total}
        onCheckout={handleCheckoutClick}
        onRemove={handleRemoveCart}
    />
})

export { AddToCartPage }