import React from 'react';
import { observer } from 'mobx-react-lite';

import { Thumbnail } from '../components/Thumbnail';


const HomePage = observer(() => {

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
            image: `${process.env.PUBLIC_URL}/images/products/paint3.jpg`,
            title: "CoffeeStyle - Webflow",
            publishedAt: "November 27, 2018",
        },
    ]
    console.log(data);
    return (
        <div>
            <h1>HOME COMPONENT</h1>
            {

                data.map((d, i) => (
                    <Thumbnail data={d} key={i} />
                ))
            }

        </div>
    )
})

export { HomePage }