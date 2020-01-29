import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function OrderHistoryView({ orders, heads }) {

    if (!orders.length) {
        return <h6>No Order found :( </h6>
    }
    return (
        <div className="container">
            <div className="table-responsive">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            {
                                heads.map((head, ind) => (
                                    <th key={ind}>{head}</th>
                                ))
                            }
                        </tr>
                    </thead>
                    <tbody>
                        {
                            orders.map((order, ind) => (
                                <tr key={ind}>
                                    <th scope="row">{ind + 1}</th>
                                    {
                                        order.map((odr, orderInd) => (
                                            <td key={orderInd}>{odr}</td>
                                        ))
                                    }
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export { OrderHistoryView }