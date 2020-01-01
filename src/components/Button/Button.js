import React from 'react';

function Button({ onClick, children }) {
    return <button data-testid="button" onClick={onClick}>{children}</button>
}

export { Button }