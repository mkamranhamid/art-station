import React, { useContext } from 'react';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../stores/rootStore';

const AuthPage = observer(() => {

    const rootStoreContext = useContext(RootStoreContext);
    const counterStore = rootStoreContext.userStore;

    return (
        <div>
            <h1>AUTH COMPONENT</h1>
            <button onClick={() => counterStore.addCount()}>+</button>
            <h1>{counterStore.counter}</h1>
            <button onClick={() => counterStore.subCount()}>-</button>
        </div>
    )
})
export { AuthPage }