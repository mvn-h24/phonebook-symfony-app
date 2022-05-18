import { defineStore } from "pinia";
import { Contact, CreateContactDto } from "@app/types";
import { createContact } from "@api-client";

export const contactStoreToken = "contact";

export interface ContactStore {
  contact?: Contact;
  newContact: boolean;
}

function defaultContact(): CreateContactDto {
  return {
    firstName: "",
    lastName: "",
    patronimycName: "",
  };
}

export const useContact = defineStore<string, ContactStore>(contactStoreToken, {
  state: (): ContactStore => ({
    contact: undefined,
    newContact: false,
  }),
  actions: {
    setContact(contact: Contact) {
      this.$state.contact = contact;
    },
    initNewContact() {
      this.$state = { contact: defaultContact(), newContact: true };
    },
    flush() {
      this.contact = undefined;
    },
    save() {
      const contact = this.contact as Contact;
      if (
        contact &&
        contact.firstName &&
        contact.lastName &&
        contact.patronimycName
      ) {
        if (this.newContact)
          return createContact({
            firstName: contact.firstName,
            lastName: contact.lastName,
            patronimycName: contact.patronimycName,
          }).then((r) => console.log(r));
      }
    },
  },
});
