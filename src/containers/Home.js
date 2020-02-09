import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';
import { fetchAllActiveProducts, fetchAllActiveProductsByQuery } from '../utils/crud';

import { getToken, removeToken } from '../utils/common';

import { Thumbnail } from '../components/Thumbnail';
import { Rating } from "../components/Rating";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'


const HomePage = observer(({ history }) => {

    const [products, setProducts] = useState(null)
    const [searchVal, setSearchVal] = useState('')
    const [items, setItems] = useState([])
    const rootStoreContext = useContext(RootStoreContext);
    const { userStore } = rootStoreContext;

    useEffect(() => {
        let mounted = true;
        const thisSetProducts = setItems;
        const productFetcher = async () => {
            try {
                const prod = await fetchAllActiveProducts()
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

    useEffect(() => {
        console.log("USE EFFECT SEARCH VALUE ")
        const productFetcher = async () => {
            try {
                const prod = await fetchAllActiveProductsByQuery(searchVal)
                setProducts(prod)
            } catch (err) {
                console.log(err)
            }
        }
        // productFetcher()
    }, [searchVal])

    const handleThumbnailClick = (id) => {
        history.push(`/art/${id}`);
    }

    return (
        <>
            <header className="header">
                <div className="header-bg-img">
                    <img src={`${process.env.PUBLIC_URL}/cover-1.png`} alt="cover image" />
                </div>
                <div className="header-search">
                    <h2>The best art shared by talented artists from all over the world.</h2>
                    <div className="header-search-input">
                        <input type="text" value={searchVal} onChange={({ target }) => setSearchVal(target.value)} />
                        <FontAwesomeIcon icon={faSearch} />
                    </div>
                </div>
            </header>
            <div className="container">
                <div className="row">
                    {
                        products && products.map((d, i) => (
                            <Thumbnail data={d} key={i} onClick={handleThumbnailClick} />
                        ))
                    }
                </div>
            </div>
        </>
    )
})

export { HomePage }