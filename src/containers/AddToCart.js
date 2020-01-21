import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';

import { AddToCartView } from "../components/AddToCartView";

const AddToCartPage = observer(({ history }) => {

    const rootStoreContext = useContext(RootStoreContext);
    const { appCartStore } = rootStoreContext;
    const [cart, setCart] = useState();
    const [total, setTotal] = useState();

    useEffect(() => {
        setCart(appCartStore.cart);
        setTotal(appCartStore.total);
    }, [appCartStore.cart.length])

    const handleCheckoutClick = () => {
        history.push('/checkout');
    }

    if (!cart) {
        return null
    }

    return <AddToCartView data={cart} total={total} onCheckout={handleCheckoutClick} />
})

export { AddToCartPage }