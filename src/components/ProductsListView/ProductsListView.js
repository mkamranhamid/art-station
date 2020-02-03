import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function ProductsListView({ products, onStatusChange }) {

    const [selectedStatus, setAction] = useState('Select Action');
    const statuses = [
        { id: 0, title: "active" },
        { id: 1, title: "inactive" },
    ]

    const setUserStatus = (status, uid, ind) => {
        products[ind].status = status;
        onStatusChange(status, uid)
    }

    if (!products.length) {
        return <h6>No User found :( Add your art from account/<Link to="/account/add-art">Add Art</Link></h6>
    }
    return (
        <div className="container pt5">
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Status</th>
                            <th>Price</th>
                            <th>Category</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, ind) => (
                                <tr key={ind}>
                                    <th scope="row">{ind + 1}</th>
                                    <td>{product.title}</td>
                                    <td>
                                        <p className="tr-description">
                                            {product.description}
                                        </p>
                                    </td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle className="p-0" variant="" id="dropdown-basic">
                                                {product.status}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    statuses.map((status) => (
                                                        <Dropdown.Item
                                                            key={status.id}
                                                            href={false}
                                                            eventKey={status.id}
                                                            onSelect={(eKey) => onStatusChange(status.title, product.id, ind)}>
                                                            <span className="ml-2">{status.title}</span>
                                                        </Dropdown.Item>
                                                    ))
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                    <td>{product.price} €</td>
                                    <td>{product.category}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export { ProductsListView }