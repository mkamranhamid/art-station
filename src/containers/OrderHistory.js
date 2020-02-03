import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { fetchAllOrdersByUID } from '../utils/crud';

import { OrderHistoryView } from "../components/OrderHistoryView";
import { Loader } from "../components/Loader";

const OrderHistoryPage = observer(({ history }) => {

    const [orders, setOrders] = useState(null);
    const [role, setRole] = useState('user');
    const [tableHead, setTableHead] = useState(['Name', 'Street', 'Zip', 'Total', 'Date']);
    const [loading, setLoader] = useState(true);
    const rootStoreContext = useContext(RootStoreContext);
    const { productStore, userStore } = rootStoreContext;

    useEffect(() => {
        if (!userStore.user) return
        setRole(userStore.user.role)
        fetchAllOrdersByUID(userStore.user.uid, userStore.user.role)
            .then((ords) => {
                productStore.setOrders(ords)
                let modifiedOrders = createTableRows(ords, userStore.user.role)
                setOrders(modifiedOrders)
                setLoader(false)
            })
            .catch((err) => {
                console.log(err);
                setLoader(false)
            });
    }, [userStore.isLoggedin, productStore.fetching.productByUID])

    const createTableRowsForUser = (ords) => {
        let newOrders = ords.map((order) => {
            let newOrder = [];
            newOrder.push(`${order.id}`)
            newOrder.push(`${order.street}`)
            newOrder.push(`${order.zip}`)
            newOrder.push(`${order.total} €`)
            newOrder.push(`${order.publishedAt}`)
            return newOrder;
        })
        return newOrders;
    }
    const createTableRowsForArtist = (ords) => {
        let newOrders = ords.map((order) => {
            let newOrder = [];
            newOrder.push(`${order.orderId}`)
            newOrder.push(`${order.product.title}`)
            newOrder.push(`${order.quantity}`)
            newOrder.push(`${order.publishedAt}`)
            return newOrder;
        })
        return newOrders;
    }

    const createTableRows = (ords, role) => {
        if (role == 'user') {
            return createTableRowsForUser(ords)
        } else if (role == 'artist') {
            setTableHead(['Order Id', 'Product', 'Price', 'Date'])
            return createTableRowsForArtist(ords)
        } else if (role == 'admin') {
            // setTableHead(['Order Id', 'Product', 'Price', 'Date'])
            return createTableRowsForUser(ords)
        }
    }

    const routeTo = (oid) => {
        history.replace(`/account/orders/${oid}`);
    }

    return (
        <div className="w-100 d-flex justify-content-center pt5">
            {
                orders && <OrderHistoryView
                    orders={orders}
                    heads={tableHead}
                    onRowPress={routeTo}
                />
            }
            {
                loading && <Loader type="large" />
            }
        </div>
    )
})

export { OrderHistoryPage }