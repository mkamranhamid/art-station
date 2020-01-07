import React, { useState } from "react";
import { Dropdown } from 'react-bootstrap';

function AddArtView({ onSubmit, error, loading }) {

    let fileInput = React.createRef();
    const [title, setTitle] = useState('');

    const formSubmit = (event) => {
        event.preventDefault();
        if (!fileInput.current.files.length || !title) {
            alert('Enter all fields')
            return
        }
        const file = fileInput.current.files[0]
        onSubmit({ title, file });
    }

    return (
        <div className="container addart-container">
            <div className="col-sm-12 col-md-9 col-lg-9">
                <h1>Add Art</h1>
                <form onSubmit={formSubmit}>
                    <div className="form-group">
                        <label htmlFor="addart-title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="addart-title"
                            aria-describedby="addArtTitle"
                            placeholder="Enter title"
                            value={title}
                            onChange={({ target }) => setTitle(target.value)}
                        />
                    </div>
                    <div className="form-group">
                        <div className="choose_file">
                            <span>Choose File</span>
                            <input
                                ref={fileInput}
                                type="file"
                            />
                        </div>
                    </div>
                    {error && (<div className="alert alert-danger" role="alert">
                        {error.message}
                    </div>)}
                    <div className="pt-2">
                        <button type="submit" disabled={loading} className="btn btn-mkh w-100">Submit</button>
                    </div>
                </form >
            </div>
        </div>
    )
}

export { AddArtView }