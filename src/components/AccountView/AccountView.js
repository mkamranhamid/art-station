import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faSave, faSignal, faUserAlt, faDumpster, faBoxOpen } from '@fortawesome/free-solid-svg-icons'

function AccountView({ routeTo }) {
    const items = [
        {
            icon: faSignal,
            title: "Dashboard",
            route: '/home'
        },
        {
            icon: faUserAlt,
            title: "Profile",
            route: '/home'
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