import { observable, action, decorate } from "mobx";
import { createContext } from "react";

class CartStore {
    rootState;
    carts = [];
    constructor(rootState) {
        this.rootState = rootState;
    }
    addCart(cart) {
        this.carts.push(cart);
    }
}

CartStore = decorate(CartStore, {
    carts: observable,
    setCart: action,
});

export { CartStore }

// export const ProductStoreContext = createContext(new ProductStore());
