import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function OrderDetailView({ carts }) {

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
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export { OrderDetailView }