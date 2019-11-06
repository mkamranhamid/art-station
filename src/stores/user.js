import { observable, action, decorate } from "mobx";
import { createContext } from "react";

class UserStore {
    rootState;
    counter = 1;
    constructor(rootState) {
        this.rootState = rootState;
    }
    addCount(counter) {
        this.counter++;
    }
    subCount(counter) {
        this.counter--;
    }
}

UserStore = decorate(UserStore, {
    counter: observable,
    setContacts: action,
});

export { UserStore }

// export const UserStoreContext = createContext(new UserStore());
