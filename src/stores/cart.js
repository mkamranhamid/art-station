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
    refreshCart() {
        this.cart = [];
        this.total = 0;
    }
    remove(ind) {
        let cartProduct = this.cart[ind];
        this.total -= (cartProduct.cartQty * cartProduct.product.price);
        this.cart.splice(ind, 1);
    }
}

AppCartStore = decorate(AppCartStore, {
    total: observable,
    cart: observable,
    addCart: action,
    refreshCart: action,
    remove: action,
});

export { AppCartStore };
