import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen, faPrint } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

import { Popup } from "../Popup";

function MyArtView({ products, onEdit, onRemove, onShowReviews }) {

    const [selectedAction, setAction] = useState('Select Action');
    const [ModalVisibility, setModalVisibility] = useState(false);
    const [ModalData, setModalData] = useState(null);
    const actions = [
        { id: 0, icon: faPen, title: "Edit" },
        { id: 1, icon: faTrash, title: "Remove" },
        { id: 2, icon: faPrint, title: "Show Reviews" },
    ]

    if (!products.length) {
        return <h6>No Art found :( Add your art from account/<Link to="/account/add-art">Add Art</Link></h6>
    }
    const handleAction = (title, product_id, ind) => {
        if (title == 'Remove') {
            console.log("REMOVE CALLED")
            setModalData({ title, product_id, product_index: ind })
            setModalVisibility(true);
            return
        } else if (title == 'Edit') {
            onEdit(title, product_id)
        } else {
            onShowReviews(title, product_id)
        }
    }

    const handleConfirmation = () => {
        setModalVisibility(false);
        onRemove(ModalData)
    }

    return (
        <div className="container">
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Date</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.map((product, ind) => (
                                <tr key={ind}>
                                    <th scope="row">{ind + 1}</th>
                                    <td>{product.title}</td>
                                    <td>{product.price} €</td>
                                    <td>{product.publishedAt}</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle className="p-0" variant="" id="dropdown-basic">
                                                {selectedAction}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    actions.map((act) => (
                                                        <Dropdown.Item
                                                            key={act.id}
                                                            href={false}
                                                            eventKey={act.id}
                                                            onSelect={() => handleAction(act.title, product.id, ind)}>
                                                            <FontAwesomeIcon icon={act.icon} />
                                                            <span className="ml-2">{act.title}</span>
                                                        </Dropdown.Item>
                                                    ))
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <Popup
                open={ModalVisibility}
                onClose={() => setModalVisibility(false)}
                onConfirm={handleConfirmation}
            >
                Are you sure you want to remove this product?
            </Popup>
        </div>
    )
}

export { MyArtView }