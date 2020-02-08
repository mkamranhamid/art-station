import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons'

function AddToCartView({ data, total, onCheckout, onRemove }) {
    if (!data || !data.length) {
        return (
            <div className="container account-container pt5">
                <div className="text-center cart-empty">
                    <FontAwesomeIcon icon={faShoppingCart} size='lg' color="#363636" />
                    <div>Your cart is empty. Why not add some items?</div>
                </div>
            </div>
        )
    }
    return (
        <div className="container account-container pt5">
            <div className="row justify-content-center">
                <h1>CART</h1>
                <div className="table-responsive">
                    <table className="table">
                        <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Product</th>
                                <th scope="col">Price (€)</th>
                                <th scope="col">Quantity</th>
                                <th scope="col">Subtotal</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                data.map((cart, ind) => {
                                    return (
                                        <tr key={ind}>
                                            <th scope="row">{ind + 1}</th>
                                            <td>{cart.product.title}</td>
                                            <td>{cart.product.price} €</td>
                                            <td>{cart.cartQty}</td>
                                            <td>{cart.cartQty * cart.product.price} €</td>
                                            <td><strong className="pointer" onClick={() => onRemove(ind)}>X</strong></td>
                                        </tr>
                                    )
                                })
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <th scope="row"></th>
                                <td colSpan="3">Total</td>
                                <td>{total} €</td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
            <div className="row">
                <button className="btn btn-mkh" onClick={onCheckout}>Proceed to Checkout</button>
            </div>
        </div>
    )
}

export { AddToCartView }