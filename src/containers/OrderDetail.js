import React, { useContext, useState, useEffect, useParams } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';
import { fetchCartsByOrderId } from '../utils/crud';

import { OrderDetailView } from "../components/OrderDetailView";

const OrderDetailPage = observer(({ history, match }) => {

    const [error, setError] = useState(null);
    const [loading, setLoader] = useState(false);
    const [carts, setCarts] = useState(null)
    const rootStoreContext = useContext(RootStoreContext);
    const { userStore } = rootStoreContext;

    useEffect(() => {
        let mounted = true;
        let { id } = match.params;
        const cartFetcher = async (id) => {
            try {
                const crts = await fetchCartsByOrderId(id)
                setCarts(crts)
            } catch (err) {
                console.log(err)
            }
        }
        cartFetcher(id)
        return () => {
            mounted = false
        }
    }, [])

    return (
        <div>
            {carts && <OrderDetailView carts={carts} />}
        </div>
    )
})

export { OrderDetailPage }