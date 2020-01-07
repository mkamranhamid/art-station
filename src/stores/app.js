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
}

AppStore = decorate(AppStore, {
    contacts: observable,
    loader: observable,
    setContacts: action,
});

export { AppStore };
