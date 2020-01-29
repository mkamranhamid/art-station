import { observable, action, decorate } from "mobx";
import { createContext } from "react";

class ProductStore {
    rootState;
    products = undefined;
    orders = undefined;
    productsByUID = undefined;
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
    setOrders(ords) {
        this.orders = ords;
    }
    setProductsByUID(prods) {
        this.productsByUID = prods;
    }
}

ProductStore = decorate(ProductStore, {
    products: observable,
    fetching: observable,
    setProducts: action,
});

export { ProductStore }

// export const ProductStoreContext = createContext(new ProductStore());
