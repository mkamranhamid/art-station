import { observable, action, decorate } from "mobx";
import { createContext } from "react";

class UserStore {
    rootState;
    counter = 1;
    user = undefined;
    isLoggedin = false;
    constructor(rootState) {
        this.rootState = rootState;
    }
    addCount(counter) {
        this.counter++;
    }
    subCount(counter) {
        this.counter--;
    }
    setUser(user) {
        this.user = user;
        this.isLoggedin = true;
    }
    removeUser() {
        this.user = undefined;
        this.isLoggedin = false;
    }
}

UserStore = decorate(UserStore, {
    counter: observable,
    user: observable,
    isLoggedin: observable,
    setContacts: action,
    setUser: action,
});

export { UserStore }

// export const UserStoreContext = createContext(new UserStore());
