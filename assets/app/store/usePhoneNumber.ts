import { defineStore } from "pinia";
import { CreatePhoneDto, Phone } from "@app/types";
import { createPhone } from "../client/createPhone";

export const phoneStoreToken = "phone";

export interface PhoneStore {
  phone?: Phone;
  newPhone: boolean;
}

function defaultPhone(id: number): CreatePhoneDto {
  return {
    contact: id,
    comment: "",
    phoneNumber: "",
  };
}

export const usePhoneNumber = defineStore<string, PhoneStore>(phoneStoreToken, {
  state: (): PhoneStore => ({
    phone: undefined,
    newPhone: false,
  }),
  actions: {
    initNew(contact_id: number) {
      this.$state = { phone: defaultPhone(contact_id), newPhone: true };
    },
    flush() {
      this.phone = undefined;
    },
    save() {
      const contact = this.phone as Phone;
      if (
        contact &&
        contact.phoneNumber &&
        contact.comment &&
        contact.contact
      ) {
        if (this.newPhone)
          return createPhone({
            phoneNumber: contact.phoneNumber,
            comment: contact.comment,
            contact: parseInt(contact.contact.toString()),
          }).then((r) => console.log(r));
      }
    },
  },
});
