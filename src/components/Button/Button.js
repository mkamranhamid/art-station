import React from 'react';

function Button({ onClick, children }) {
    return <button onClick={onClick}>{children}</button>
}

export { Button }