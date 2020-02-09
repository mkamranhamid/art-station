import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { Link } from "react-router-dom";

import { Rating } from "../Rating";
import { Popup } from "../Popup";

function OrderDetailView({ carts, onReview }) {

    const [ModalVisibility, setModalVisibility] = useState(false);
    const [ModalData, setModalData] = useState(null);
    const [modalResponse, setModalResponse] = useState({
        description: '',
        rating: 0
    });

    const handleConfirmation = () => {
        console.log("handleConfirmation: ", modalResponse);
        onReview({ modalResponse, cart: ModalData.cartObj, cartIndex: ModalData.cartIndex });
        setModalVisibility(false)
    }

    const handleReviewBtn = (cartIndex, cartObj) => {
        setModalData({ cartIndex, cartObj })
        setModalVisibility(true)
    }

    const handleRatingChange = (rating) => {
        setModalResponse({
            ...modalResponse,
            rating
        })
    }

    const isValidateObject = (obj) => {
        let isInvalid = Object.values(obj).map((val) => {
            return !val;
        })
        return isInvalid.includes(true);
    }

    if (!carts.length) {
        return <h6>No Cart found for this order :(</h6>
    }
    return (
        <div className="container">
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Order Id</th>
                            <th>Product</th>
                            <th>Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            carts.map((cart, ind) => (
                                <tr key={ind}>
                                    <th scope="row">{ind + 1}</th>
                                    <td>{cart.orderId}</td>
                                    <td>{cart.product.title}</td>
                                    <td>{cart.publishedAt}</td>
                                    <td>
                                        {!cart.review && <button className="btn btn-mkh ml-4" onClick={() => handleReviewBtn(ind, cart)}>Review</button>}
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Popup
                title="Review"
                open={ModalVisibility}
                onClose={() => setModalVisibility(false)}
                onConfirm={handleConfirmation}
                confirmedDisabled={isValidateObject(modalResponse)}
            >
                <div className="text-center">
                    <Rating
                        showEmoji
                        rating={0}
                        onChangeRating={handleRatingChange}
                    />
                    <div className="form-group mt-3">
                        <textarea
                            type="text"
                            className="form-control"
                            id="rating-description"
                            aria-describedby="ratingDescription"
                            placeholder="Would you like to tell us why you choose this rating?"
                            value={modalResponse.description}
                            onChange={({ target }) => setModalResponse({
                                ...modalResponse,
                                description: target.value
                            })}
                        />
                    </div>
                </div>
            </Popup>
        </div>
    )
}

export { OrderDetailView }