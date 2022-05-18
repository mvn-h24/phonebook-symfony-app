<template>
  <div class="island">
    <div class="control-panel">
      <ActionKey @click="initNewContact">Add contact</ActionKey>
    </div>
    <div class="contacts_list">
      <contacts-list />
    </div>
  </div>
  <contact-dialog />
</template>

<script lang="ts">
import ActionKey from "@app/ui/action-key.vue";
import ContactDialog from "@app/ui/contact-dialog.vue";
import { defineComponent } from "vue";
import { PhoneBookStoreActions, useContact, usePhoneBook } from "@app/store";
import ContactsList from "@app/ui/contacts-list.vue";

export default defineComponent({
  components: {
    ContactsList,
    ContactDialog,
    ActionKey,
  },
  name: "phone-book",
  setup() {
    const contactStore = useContact();
    const phoneBookStore = usePhoneBook();

    return {
      contactStore,
      phoneBookStore,
    };
  },
  async mounted() {
    await this.loadContacts();
    this.contactStore.$onAction(({ name, after }) => {
      if (name === "flush") {
        after(() => this.loadContacts());
      }
    });
  },
  methods: {
    initNewContact() {
      return this.contactStore.initNewContact();
    },
    loadContacts() {
      return (this.phoneBookStore as PhoneBookStoreActions).loadList();
    },
  },
});
</script>

<style scoped>
.island {
  width: 90%;
  height: 90vh;
  padding: 20px;
  margin: auto;
  background: #898686;
  border-radius: 20px;
}

.contacts_list {
  overflow: scroll;
}

.contacts_list {
  margin-top: 10px;
}
</style>
