import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faStar } from '@fortawesome/free-solid-svg-icons'

function Rating({ rating, onChangeRating, readonly, showEmoji }) {
    const emojis = ['😞', '😑', '😋', '😀', '😄']
    const [stars, setStars] = useState(null);
    const [starColoring, setStarColoring] = useState(rating);
    const [starRating, setStarRating] = useState(rating);
    const [mouseEvent, setMouseEvent] = useState('');

    useEffect(() => {
        let allStars = Array(5).fill().map((d, i) => i + 1)
        setStars(allStars)
    }, [])

    const handleMouseOver = (ind) => {
        if (readonly) return
        setMouseEvent('mouseover')
        setStarColoring(ind + 1)
    }

    const handleMouseLeave = (ind) => {
        if (readonly) return
        setMouseEvent('mouseleave')
    }

    const handleMouseClick = (ind) => {
        if (readonly) return
        setStarRating(ind + 1)
        onChangeRating(ind + 1)
    }

    const setStarColor = (ind) => {
        let colored_stars = starRating;
        if (mouseEvent == "mouseover") {
            return starColoring >= ind + 1 ? '#d8b11e' : '#ada5a5';
        } else {
            return starRating >= ind + 1 ? '#f3e430' : '#ada5a5';
        }
    }

    const renderEmoji = () => {
        if (!starRating) {
            return '😶'
        }
        let emojiIndex = starRating - 1;
        return emojis[emojiIndex];
    }

    if (!stars) return null

    return (
        <span className="star-rating">
            <h1>
                {showEmoji && renderEmoji()}
            </h1>

            {
                stars.map((d, ind) => {
                    return (<FontAwesomeIcon
                        key={ind}
                        icon={faStar}
                        size='lg'
                        color={setStarColor(ind)}
                        onMouseOver={() => handleMouseOver(ind)}
                        onMouseLeave={() => handleMouseLeave(ind)}
                        onClick={() => handleMouseClick(ind)}
                    />)
                })
            }

        </span>
    )
}
export { Rating }