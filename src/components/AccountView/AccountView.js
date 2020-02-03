import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faSave, faSignal, faUserAlt, faDumpster, faBoxOpen, faPalette, faUsers, faBoxes } from '@fortawesome/free-solid-svg-icons'

function AccountView({ routeTo, role }) {
    let additional_items = [];
    let items = [
        {
            icon: faUserAlt,
            title: "Profile",
            route: '/account/profile'
        },
        {
            icon: faDumpster,
            title: "Order History",
            route: '/account/orders'
        },
        /* {
            icon: faSignal,
            title: "Dashboard",
            route: '/home'
        }, */
    ]
    if (role == 'artist') {
        additional_items = [
            {
                icon: faBoxOpen,
                title: "Add Art",
                route: '/account/add-art'
            },

            {
                icon: faPalette,
                title: "My Art",
                route: '/account/my-art'
            },
        ]
    }
    if (role == 'admin') {
        additional_items = [
            {
                icon: faUsers,
                title: "Users",
                route: '/account/users'
            },
            {
                icon: faBoxes,
                title: "Products",
                route: '/account/products'
            },
        ]
    }
    items = items.concat(additional_items)

    return (
        <div className="container account-container pt5">
            <div className="row justify-content-center">
                {
                    items.map((item, ind) => (
                        <div className="col-sm col-lg-4 item" key={ind} onClick={() => routeTo(item.route)}>
                            <div className="icon">
                                <FontAwesomeIcon icon={item.icon} />
                            </div>
                            <div className="title">
                                {item.title}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export { AccountView }