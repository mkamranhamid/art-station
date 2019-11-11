import React from "react";


function Thumbnail({ }) {
    return (
        <div className="thumbnail">
            <div className="thumbnail-img">
                <img src={`${process.env.PUBLIC_URL}/images/products/paint1.jpg`} />
            </div>
            <div className="thumbnail-info">
                <div className="info-name">
                    Paint Name
                </div>
                <div className="info-published-date">
                    August 13, 2019
                </div>
            </div>
        </div>
    )
}

export { Thumbnail }