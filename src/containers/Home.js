import React, { useContext, useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { RootStoreContext } from '../stores/rootStore';
import { getUser } from '../utils/auth';

import { getToken, removeToken } from '../utils/common';

import { Thumbnail } from '../components/Thumbnail';


const HomePage = observer(({ history }) => {

    const rootStoreContext = useContext(RootStoreContext);
    const { userStore } = rootStoreContext;
    const data = [
        {
            image: `${process.env.PUBLIC_URL}/images/products/paint1.jpg`,
            title: "Snickers eShop",
            publishedAt: "October 25, 2018",
        },
        {
            image: `${process.env.PUBLIC_URL}/images/products/paint2.jpg`,
            title: "Uruoi Japanese Skincare",
            publishedAt: "August 13, 2019",
        },
        {
            image: `${process.env.PUBLIC_URL}/images/products/paint7.jpg`,
            title: "Curioso - Photography",
            publishedAt: "September 17, 2018",
        },
        {
            image: `${process.env.PUBLIC_URL}/images/products/paint9.jpg`,
            title: "Steve Johnson",
            publishedAt: "December 31, 2019",
        },
        {
            image: `${process.env.PUBLIC_URL}/images/products/paint10.jpg`,
            title: "Ussgs",
            publishedAt: "December 31, 2019",
        },
    ]

    useEffect(() => {
        /* const token = getToken()
        getUser(token)
            .then((user) => userStore.setUser(user))
            .catch((err) => {
                console.log(err);
                removeToken();
                history.replace('auth');
            }); */
        console.log("useEffect: ");
    }, [])

    console.log("userStore.user: ", userStore.user);
    return (
        <div>
            {
                data.map((d, i) => (
                    <Thumbnail data={d} key={i} />
                ))
            }
        </div>
    )
})

export { HomePage }