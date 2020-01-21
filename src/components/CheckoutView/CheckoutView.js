import React, { useState } from 'react';

import { Button } from '../Button'

function CheckoutView({ total, onPlaceOrder, loading }) {

    const [address, setAddress] = useState({
        firstName: '',
        lastName: '',
        street: '',
        zip: '',
    });

    const handlePlaceorder = () => {
        let valid = true;
        Object.keys(address).map((key) => {
            if (!address[key]) {
                valid = false;
            }
        })
        if (!valid) {
            alert('Please enter valid fields')
            return
        }
        onPlaceOrder(address)
    }

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12">
                    <h1 className="text-center">Checkout</h1>
                </div>
                <div className="col-md-12">
                    <form>
                        <div className="form-group">
                            <label htmlFor="addart-title">First Name</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                id="addart-firstName"
                                aria-describedby="addArtFirstName"
                                placeholder="Enter first name"
                                value={address.firstName}
                                onChange={({ target }) => setAddress({ ...address, firstName: target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="addart-lastName">Last Name</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                id="addart-lastName"
                                aria-describedby="addArtLastName"
                                placeholder="Enter last name"
                                value={address.lastName}
                                onChange={({ target }) => setAddress({ ...address, lastName: target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="addart-lastName">Street Address</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                id="addart-street"
                                aria-describedby="addArtStreet"
                                placeholder="Enter street"
                                value={address.street}
                                onChange={({ target }) => setAddress({ ...address, street: target.value })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="addart-lastName">Zip</label>
                            <input
                                type="text"
                                required
                                className="form-control"
                                id="addart-zip"
                                aria-describedby="addArtZip"
                                placeholder="Enter zip"
                                value={address.zip}
                                onChange={({ target }) => setAddress({ ...address, zip: target.value })}
                            />
                        </div>
                    </form>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">Total</th>
                                <th scope="col">{total} €</th>
                            </tr>
                        </thead>
                    </table>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <Button loading={loading} onClick={handlePlaceorder}>Place order</Button>
                </div>
            </div>
        </div>
    )
}

export { CheckoutView }