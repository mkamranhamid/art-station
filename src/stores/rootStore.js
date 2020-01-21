import { createContext } from "react";
import { AppStore } from "./app";
import { CommonStore } from "./common";
import { UserStore } from "./user";
import { ProductStore } from "./product";
import { AppCartStore } from "./cart";

class RootStore {
    appStore = new AppStore(this)
    commonStore = new CommonStore(this)
    userStore = new UserStore(this)
    productStore = new ProductStore(this)
    appCartStore = new AppCartStore(this)
}

export const RootStoreContext = createContext(new RootStore());
