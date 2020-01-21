import { observable, action, decorate } from "mobx";

class AppStore {
    rootState;
    contacts = [];
    loader = false;
    constructor(rootState) {
        this.rootState = rootState;
    }
    setContacts(contacts) {
        this.contacts = contacts;
    }
    toggleLoader() {
        this.loader = !this.loader;
    }
}

AppStore = decorate(AppStore, {
    contacts: observable,
    loader: observable,
    setContacts: action,
    toggleLoader: action,
});

export { AppStore };
