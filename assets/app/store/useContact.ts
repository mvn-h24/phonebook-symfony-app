import { defineStore } from "pinia";
import { Contact, CreateContactDto } from "@app/types";
import { createContact, getContact, putContact } from "@api-client";

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
    setToEdit(contact: Contact) {
      this.$state = { contact, newContact: false };
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
          });
        else return putContact(contact);
      }
    },
    update() {
      if (this.contact?.id) {
        return getContact(parseInt(this.contact.id.toString())).then((res) => {
          this.$state.contact = res;
        });
      }
    },
  },
});
