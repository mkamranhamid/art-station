import { createContext } from "react";
import { AppStore } from "./app";
import { CommonStore } from "./common";
import { UserStore } from "./user";

class RootStore {
    appStore = new AppStore(this)
    commonStore = new CommonStore(this)
    userStore = new UserStore(this)
}

export const RootStoreContext = createContext(new RootStore());
