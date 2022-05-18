<template>
  <template v-if="contactList.length">
    <table>
      <thead>
        <tr>
          <th>ФИО</th>
          <th>Телефоны</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="contact in contactList" :key="contact.id">
          <td>
            {{ contact.patronimycName }}
            {{ contact.firstName }}
            {{ contact.lastName }}
          </td>
          <td>
            <ul v-if="contact.phones.length">
              <li v-for="phone in contact.phones" :key="phone.id">
                <span>{{ `${phone.phoneNumber} ${phone.comment}` }}</span>
              </li>
            </ul>
            <div v-else>Для контакта нет номеров</div>
          </td>
          <td>
            <action-key @click="callEdit(contact)">Edit</action-key>
            <action-key @click="callDelete(contact.id)">Delete</action-key>
          </td>
        </tr>
      </tbody>
    </table>
  </template>
  <template v-else>
    <text-notify>Contacts not found</text-notify>
  </template>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { storeToRefs } from "pinia";
import { PhoneBookStoreActions, useContact, usePhoneBook } from "@app/store";
import TextNotify from "@app/ui/text-notify.vue";
import ActionKey from "@app/ui/action-key.vue";
import { Contact } from "@app/types";
import { deleteContact } from "@api-client";

export default defineComponent({
  name: "contacts-list",
  components: { ActionKey, TextNotify },
  setup() {
    const phoneBookStore = usePhoneBook();
    const { contactList } = storeToRefs(phoneBookStore);
    const contactStore = useContact();
    return { contactStore, phoneBookStore, contactList };
  },
  methods: {
    callEdit(contact: Contact) {
      this.contactStore.setToEdit(contact);
    },
    callDelete(id: number) {
      return deleteContact(id).then(() => {
        (this.phoneBookStore as PhoneBookStoreActions).loadList();
      });
    },
  },
});
</script>

<style scoped>
table {
  width: 100%;
  min-width: 900px;
  border-collapse: collapse;
}

table td,
table th {
  border: 1px solid black;
}

table td {
  padding: 5px 10px;
}

table td ::v-deep(button:not(first-child)) {
  margin-left: 5px;
}
</style>
