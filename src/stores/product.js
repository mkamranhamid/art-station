import { observable, action, decorate } from "mobx";
import { createContext } from "react";

class ProductStore {
    rootState;
    products = undefined;
    allproducts = undefined;
    orders = undefined;
    productsByUID = [];
    fetching = {
        allProducts: false,
        productByUID: false,
    }
    constructor(rootState) {
        this.rootState = rootState;
    }
    setProducts(prods) {
        this.products = prods;
    }
    setAllProducts(prods) {
        this.allproducts = prods;
    }
    setOrders(ords) {
        this.orders = ords;
    }
    setProductsByUID(prods) {
        this.productsByUID = prods;
    }
    refreshProductsByUID(prods) {
        this.productsByUID = [];
    }
    removeProductByIndex(ind) {
        this.productsByUID.splice(ind, 1);
    }
}

ProductStore = decorate(ProductStore, {
    products: observable,
    fetching: observable,
    productsByUID: observable,
    setProducts: action,
    removeProductByIndex: action,
    refreshProductsByUID: action,
});

export { ProductStore }

// export const ProductStoreContext = createContext(new ProductStore());
