import { observable, action, decorate } from "mobx";

class CommonStore {
    rootState;
    contacts = [];
    constructor(rootState) {
        this.rootState = rootState;
    }
    setContacts(contacts) {
        this.contacts = contacts;
    }
}

CommonStore = decorate(CommonStore, {
    contacts: observable,
    setContacts: action,
});

export { CommonStore };
