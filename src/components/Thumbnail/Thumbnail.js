import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faSave } from '@fortawesome/free-solid-svg-icons'


function Thumbnail({ data: { image, title, publishedAt, id }, onClick }) {
    return (
        <div className="thumbnail col-md-6 col-sm-12" onClick={() => onClick(id)}>
            <div className="thumbnail-img">
                <img className="img-thumbnail" src={image} alt={title} />
            </div>
            <div className="thumbnail-info">
                <div className="infos">
                    <div className="info-name">
                        {title}
                    </div>
                    <div className="info-published-date">
                        {publishedAt}
                    </div>
                </div>
            </div>
        </div>
    )
}

export { Thumbnail }