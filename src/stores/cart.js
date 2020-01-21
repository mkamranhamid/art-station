import { observable, action, decorate } from "mobx";
import { findIfProductExistInCart } from "../utils/common";

class AppCartStore {
    rootState;
    loader = false;
    cart = [];
    total = 0;
    constructor(rootState) {
        this.rootState = rootState;
    }
    addCart(cart) {
        let { found, index } = findIfProductExistInCart(this.cart, cart.product.id);
        if (found) {
            this.cart[index].cartQty++;
        } else {
            this.cart.push(cart);
        }
        this.total += +cart.cartQty * +cart.product.price;
    }
}

AppCartStore = decorate(AppCartStore, {
    total: observable,
    cart: observable,
    addCart: action,
});

export { AppCartStore };
