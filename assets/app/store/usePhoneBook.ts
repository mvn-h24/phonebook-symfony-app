import { defineStore } from "pinia";
import { Contact } from "@app/types";
import { getContactList } from "@api-client";

export const phonebookStoreToken = "phonebook";

export interface PhoneBookStore {
  contactList: Array<Contact>;
}

export interface PhoneBookStoreActions {
  loadList(): void;
}

export const usePhoneBook = defineStore<
  string,
  PhoneBookStore,
  any,
  PhoneBookStoreActions
>(phonebookStoreToken, {
  state: (): PhoneBookStore => ({
    contactList: [],
  }),
  actions: {
    loadList() {
      return getContactList().then((res) => {
        if (Array.isArray(res)) {
          this.contactList = res;
        }
      });
    },
  },
});
