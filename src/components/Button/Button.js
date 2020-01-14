import React from 'react';
import { Loader } from '../Loader'

function Button({ onClick, children, loading, type = "button" }) {

    const handleOnClick = () => {
        if (loading) return
        onClick()
    }

    return (
        <button
            type={type}
            disabled={loading}
            className="btn btn-mkh w-100 vertical-horizontal-center"
            onClick={handleOnClick}>
            {children}
            {
                loading && <Loader />
            }
        </button>)
}

export { Button }