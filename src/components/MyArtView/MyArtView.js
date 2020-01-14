import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'

function MyArtView({ products, onActionChange }) {

    const [selectedAction, setAction] = useState('Select Action');
    const actions = [
        { id: 0, icon: faPen, title: "Edit" },
        { id: 1, icon: faTrash, title: "Remove" },
    ]

    const handleAction = (act) => {
        if (act.title == "Edit") {
            console.log("ACT EDIT: ", act)
        } else {
            console.log("ACT REMOVE: ", act)
        }
    }

    return (
        <div className="container">
            {/* <h4>MY ART</h4> */}
            {!products.length && <h6>No Art found :( Add your art</h6>}
            {
                products.length && <table className="table table-responsive">
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
                                    <td>{product.price}</td>
                                    <td>{product.publishedAt}</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                                {selectedAction}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    actions.map((act) => (
                                                        <Dropdown.Item
                                                            key={act.id}
                                                            href={false}
                                                            eventKey={act.id}
                                                            onSelect={(eKey) => onActionChange(act.title, product.id)}>
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
            }

        </div>
    )
}

export { MyArtView }