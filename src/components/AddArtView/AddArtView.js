import React, { useState, useEffect } from "react";
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEuroSign } from '@fortawesome/free-solid-svg-icons'

import { Button } from '../Button'

function AddArtView({ onSubmit, error, loading, product }) {

    useEffect(() => {
        if (product) {
            setTitle(product.title)
            setPrice(product.price)
        }
    }, [product])

    let fileInput = React.createRef();
    const [title, setTitle] = useState('');
    const [price, setPrice] = useState(1);
    const [heading, setHeading] = useState("Add");

    const formSubmit = (event) => {
        event.preventDefault();
        let [file] = fileInput.current.files
        if ((!file && !product) || !title) {  // file in edit view is not compulsory
            alert('Enter all fields')
            return
        }
        // const file = fileInput.current.files[0]
        onSubmit({ title, file, price });
    }

    return (
        <div className="container addart-container">
            <div className="col-sm-12 col-md-9 col-lg-9">
                <h1>{heading} Art</h1>
                <form onSubmit={formSubmit}>
                    <div className="form-group">
                        <label htmlFor="addart-title">Title</label>
                        <input
                            type="text"
                            required
                            className="form-control"
                            id="addart-title"
                            aria-describedby="addArtTitle"
                            placeholder="Enter title"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="addart-price">Price ( <FontAwesomeIcon icon={faEuroSign} /> ) </label>
                        <input
                            type="number"
                            required
                            className="form-control"
                            id="addart-price"
                            aria-describedby="addArtPrice"
                            placeholder="Enter price"
                            value={price}
                            onChange={({ target }) => setPrice(target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <div className="choose_file">
                            <span>Choose File</span>
                            <input
                                ref={fileInput}
                                type="file"
                                accept="image/x-png,image/gif,image/jpeg"
                            />
                        </div>
                    </div>
                    {error && (<div className="alert alert-danger" role="alert">
                        {error.message}
                    </div>)}
                    <div className="pt-2">
                        <Button type="submit" loading={loading} onClick={console.log}>Submit</Button>
                    </div>
                </form >
            </div>
        </div>
    )
}

export { AddArtView }