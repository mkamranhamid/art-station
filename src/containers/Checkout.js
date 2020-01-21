import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';
import { placeOrder } from '../utils/crud';

import { CheckoutView } from "../components/CheckoutView";

const CheckoutPage = observer(({ history }) => {

    const rootStoreContext = useContext(RootStoreContext);
    const { appCartStore, userStore } = rootStoreContext;
    const [total, setTotal] = useState();
    const [cart, setCart] = useState();
    const [loading, setLoader] = useState(false);

    useEffect(() => {
        setTotal(appCartStore.total);
        setCart(appCartStore.cart);
    }, [appCartStore.cart.length])

    const handleRouteTo = (where) => {
        history.push(where);
    }

    const handlePlaceOrder = async (address) => {
        try {
            setLoader(true)
            console.log("address:", address)
            await placeOrder(address, userStore.user.uid, cart, total)
            appCartStore.refreshCart()
            history.push('/home');
            setLoader(false)
        } catch (err) {
            console.log(err)
            setLoader(false)
        }
    }

    return <CheckoutView total={total} onPlaceOrder={handlePlaceOrder} loading={loading} />
})

export { CheckoutPage }