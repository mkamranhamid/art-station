import React from 'react';
import { Header } from "./containers/Header";
import { AuthGuard } from './containers/AuthGuard';

function Main({ children, ...props }) {

    return (
        <AuthGuard {...props}>
            <Header {...props} />
            {children}
        </AuthGuard>
    )
}

export { Main }