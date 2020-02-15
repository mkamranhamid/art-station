import React, { useState, useEffect } from "react";
import { Dropdown } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faEuroSign } from '@fortawesome/free-solid-svg-icons'

import { Button } from '../Button'

const categories = [
    { id: 0, title: 'modernism' },
    { id: 1, title: 'cubism' },
    { id: 2, title: 'surrealism' },
    { id: 3, title: 'expressionism' },
    { id: 4, title: 'abstract' },
    { id: 5, title: 'impressionism' },
]

function AddArtView({ onSubmit, error, loading, product }) {

    useEffect(() => {
        if (product) {
            setHeading('Update')
            setTitle(product.title)
            setImgSrc(product.image)
            setPrice(product.price)
            setQuantity(product.quantity || 1)
            setDescription(product.description || '')
            setCategory(product.category || '')
        }
    }, [product])

    let fileInput = React.createRef();
    const [title, setTitle] = useState('');
    const [imgSrc, setImgSrc] = useState(null);
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(1);
    const [quantity, setQuantity] = useState(1);
    const [selectedCategory, setCategory] = useState('modernism');
    const [heading, setHeading] = useState("Add");

    const formSubmit = (event) => {
        event.preventDefault();
        let editMode = heading == 'Update';
        let [file] = fileInput.current.files
        if ((!file && !editMode) || (!title || !description || !price || !selectedCategory || !quantity)) {  // file in edit view is not compulsory
            alert('Enter all fields')
            return
        }
        // const file = fileInput.current.files[0]
        onSubmit({ title, description, file, price, quantity, category: selectedCategory, status: 'active' });
    }

    const handleChangeInput = ({ target }) => {
        setImgSrc(URL.createObjectURL(target.files[0]))
    }

    return (
        <div className="container addart-container pt5">
            <div className="col-sm-12 col-md-9 col-lg-9">
                <h3 className="text-center">{heading} Art</h3>
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
                        <label htmlFor="addart-price">Description</label>
                        <textarea
                            type="text"
                            required
                            className="form-control"
                            id="addart-description"
                            aria-describedby="addArtDescription"
                            placeholder="Enter Description of your art here"
                            value={description}
                            onChange={({ target }) => setDescription(target.value)}
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
                    <input type="file" placeholder="Write something" onChange={handleChangeInput} />
                    {/* <div className="form-group">
                        <label htmlFor="addart-price">Quantity</label>
                        <input
                            type="number"
                            required
                            className="form-control"
                            id="addart-quantity"
                            aria-describedby="addArtQuantity"
                            placeholder="Enter number of pieces of this arts"
                            value={quantity}
                            onChange={({ target }) => setQuantity(target.value)}
                        />
                    </div> */}
                    <div className="form-group">
                        <label htmlFor="register-role">Category</label>
                        <Dropdown>
                            <Dropdown.Toggle variant="" id="dropdown-basic">
                                {selectedCategory}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                {
                                    categories.map((d) => (
                                        <Dropdown.Item
                                            key={d.id}
                                            href={false}
                                            eventKey={d.id}
                                            onSelect={(eKey) => setCategory(d.title)}>
                                            {d.title}
                                        </Dropdown.Item>
                                    ))
                                }

                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="form-group">
                        <div className="choose_file">
                            <span>Choose File</span>
                            <input
                                ref={fileInput}
                                onChange={handleChangeInput}
                                type="file"
                                accept="image/x-png,image/gif,image/jpeg"
                            />
                        </div>
                        <div className="thumbnail-img">
                            <img className="img-thumbnail" src={imgSrc} alt={title} />
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