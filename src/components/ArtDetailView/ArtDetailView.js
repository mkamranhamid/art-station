import React from "react";
import { Rating } from "../Rating";

export const ArtDetailView = ({ product, onCartAdd }) => {


    return (
        <div className="container">
            <div className="row">
                <div className="col-md-12 col-sm-12 text-center">
                    <p>{product.publishedAt}</p>
                    <h1>{product.title}</h1>
                </div>
            </div>
            <div className="row" style={{ backgroundColor: '#f9f9f9', padding: '10% 10% 10% 10%' }}>
                <img className="w-100 img-thumbnail" src={product.image} alt={product.title} />
            </div>
            <div className="row mt-5">
                <div className="col-md-9 col-sm-12 p-0">
                    <h3>About</h3>
                    <p>{product.description}</p>
                </div>
                <div className="col-md-3 col-sm-12">
                    <div className="ml-2">
                        <h5>Date</h5>
                        <p>{product.publishedAt}</p>
                    </div>
                    <div className="m-2">
                        <h5>Category</h5>
                        <p>{product.category}</p>
                    </div>
                    <div className="m-2">
                        <h5>Price</h5>
                        <p>{product.price} €</p>
                    </div>
                    <div className="m-2">
                        <h5>Curator</h5>
                        <p>{product.user.name}</p>
                    </div>
                    <div className="m-2">
                        <h5>Rating</h5>
                        <Rating
                            readonly
                            rating={product.rating}
                        />
                    </div>
                    <div className="m-2">
                        {product.quantity > 0 && <button className="btn btn-outline-mkh" onClick={() => onCartAdd(product)}>Add to Cart</button>}
                        {product.quantity == 0 && <h5 className="mkh-text">Sold</h5>}
                    </div>
                </div>
            </div>
        </div>
    )
}