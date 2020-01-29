import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';
import { fetchAllProducts } from '../utils/crud';

import { getToken, removeToken } from '../utils/common';

import { Thumbnail } from '../components/Thumbnail';


const HomePage = observer(({ history }) => {

    const [products, setProducts] = useState(null)
    const [items, setItems] = useState([])
    const rootStoreContext = useContext(RootStoreContext);
    const { userStore } = rootStoreContext;

    useEffect(() => {
        let mounted = true;
        const thisSetProducts = setItems;
        const productFetcher = async () => {
            try {
                const prod = await fetchAllProducts()
                setProducts(prod)
            } catch (err) {
                console.log(err)
            }
        }
        productFetcher()
        return () => {
            mounted = false
        }
    }, [])

    const handleThumbnailClick = (id) => {
        history.push(`/art/${id}`);
    }

    return (
        <div className="container">
            <div className="row">
                {
                    products && products.map((d, i) => (
                        <Thumbnail data={d} key={i} onClick={handleThumbnailClick} />
                    ))
                }
            </div>
        </div>
    )
})

export { HomePage }