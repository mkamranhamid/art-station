import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faSave } from '@fortawesome/free-solid-svg-icons'


function Thumbnail({ data:{image, title, publishedAt} }) {
    console.log({ image, title, publishedAt })
    return (
        <div className="thumbnail">
            <div className="thumbnail-img">
                <img className="img-thumbnail" src={image} />
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
                <div className="info-actions">
                    <button><FontAwesomeIcon icon={faHeart} /></button>
                    <button><FontAwesomeIcon icon={faSave} /></button>
                </div>
            </div>
        </div>
    )
}

export { Thumbnail }