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
            setPrice(product.price)
            setDescription(product.description || '')
            setCategory(product.category || '')
        }
    }, [product])

    let fileInput = React.createRef();
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState(1);
    const [selectedCategory, setCategory] = useState('modernism');
    const [heading, setHeading] = useState("Add");

    const formSubmit = (event) => {
        event.preventDefault();
        let editMode = heading == 'Update';
        let [file] = fileInput.current.files
        if ((!file && !editMode) || (!title || !description || !price || !selectedCategory)) {  // file in edit view is not compulsory
            alert('Enter all fields')
            return
        }
        // const file = fileInput.current.files[0]
        onSubmit({ title, description, file, price, category: selectedCategory });
    }

    return (
        <div className="container addart-container">
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