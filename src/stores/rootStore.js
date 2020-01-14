import { createContext } from "react";
import { AppStore } from "./app";
import { CommonStore } from "./common";
import { UserStore } from "./user";
import { ProductStore } from "./product";

class RootStore {
    appStore = new AppStore(this)
    commonStore = new CommonStore(this)
    userStore = new UserStore(this)
    productStore = new ProductStore(this)
}

export const RootStoreContext = createContext(new RootStore());
