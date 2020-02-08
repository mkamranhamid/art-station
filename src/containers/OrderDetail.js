import React, { useContext, useState, useEffect, useParams } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';
import { fetchCartsByOrderId } from '../utils/crud';

import { OrderDetailView } from "../components/OrderDetailView";
import { Loader } from "../components/Loader";

const OrderDetailPage = observer(({ history, match }) => {

    const [error, setError] = useState(null);
    const [loading, setLoader] = useState(true);
    const [carts, setCarts] = useState(null)
    const rootStoreContext = useContext(RootStoreContext);
    const { userStore } = rootStoreContext;

    useEffect(() => {
        let mounted = true;
        let { id } = match.params;
        const cartFetcher = async (id) => {
            try {
                const crts = await fetchCartsByOrderId(id)
                setLoader(false)
                setCarts(crts)
            } catch (err) {
                setLoader(false)
                console.log(err)
            }
        }
        cartFetcher(id)
        return () => {
            mounted = false
        }
    }, [])

    return (
        <div className="w-100 d-flex justify-content-center pt5">
            {carts && <OrderDetailView carts={carts} />}
            {
                loading && <Loader type="large" />
            }
        </div>
    )
})

export { OrderDetailPage }