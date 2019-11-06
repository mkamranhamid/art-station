import { observable, action, decorate } from "mobx";

class AppStore {
    rootState;
    contacts = [];
    constructor(rootState) {
        this.rootState = rootState;
    }
    setContacts(contacts) {
        this.contacts = contacts;
    }
}

AppStore = decorate(AppStore, {
    contacts: observable,
    setContacts: action,
});

export { AppStore };
