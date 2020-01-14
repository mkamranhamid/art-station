import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faSave, faSignal, faUserAlt, faDumpster, faBoxOpen, faPalette } from '@fortawesome/free-solid-svg-icons'

function AccountView({ routeTo }) {
    const items = [
        {
            icon: faPalette,
            title: "My Art",
            route: '/account/my-art'
        },
        {
            icon: faUserAlt,
            title: "Profile",
            route: '/account/profile'
        },
        {
            icon: faDumpster,
            title: "Order History",
            route: '/home'
        },
        {
            icon: faBoxOpen,
            title: "Add Art",
            route: '/account/add-art'
        },
        {
            icon: faSignal,
            title: "Dashboard",
            route: '/home'
        },

    ]
    return (
        <div className="container account-container">
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