import React from 'react';
import { Header } from "./containers/Header";

function Main({ children, ...props }) {

    return (
        <div>
            <Header {...props} />
            {children}
        </div>
    )
}

export { Main }