import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

function UsersListView({ users, onStatusChange }) {

    const [selectedStatus, setAction] = useState('Select Action');
    const statuses = [
        { id: 0, title: "active" },
        { id: 1, title: "pending" },
        { id: 2, title: "inactive" },
    ]

    const setUserStatus = (status, uid, ind) => {
        users[ind].status = status;
        onStatusChange(status, uid)
    }

    if (!users.length) {
        return <h6>No User found :( Add your art from account/<Link to="/account/add-art">Add Art</Link></h6>
    }
    return (
        <div className="container pt5">
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Status</th>
                            <th>Email</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, ind) => (
                                <tr key={ind}>
                                    <th scope="row">{ind + 1}</th>
                                    <td>{user.name}</td>
                                    <td>{user.username}</td>
                                    <td>
                                        <Dropdown>
                                            <Dropdown.Toggle className="p-0" variant="" id="dropdown-basic">
                                                {user.status}
                                            </Dropdown.Toggle>
                                            <Dropdown.Menu>
                                                {
                                                    statuses.map((status) => (
                                                        <Dropdown.Item
                                                            key={status.id}
                                                            href={false}
                                                            eventKey={status.id}
                                                            onSelect={(eKey) => onStatusChange(status.title, user.id, ind)}>
                                                            <span className="ml-2">{status.title}</span>
                                                        </Dropdown.Item>
                                                    ))
                                                }
                                            </Dropdown.Menu>
                                        </Dropdown>
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export { UsersListView }