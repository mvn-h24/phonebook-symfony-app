<template>
  <div id="id_layout">
    <ActionKey @click="initNewContact">Add contact</ActionKey>
    <ContactsList :list="contacts_list" />
    <ContactDialog
      v-if="new_contact || edit_contact"
      :contact="new_contact ? new_contact : edit_contact"
    />
  </div>
</template>

<!--suppress CssUnusedSymbol -->
<style>
html,
body,
#app,
#id_layout {
  padding: 0;

  margin: 0;
  min-height: 100vh;
}
</style>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { Contact } from "./types";
import ContactsList from "./components/contacts-list.vue";
import ActionKey from "./components/action-key.vue";
import ContactDialog from "./components/contact-dialog.vue";

export default defineComponent({
  name: "phonebook-app",
  components: { ContactDialog, ContactsList, ActionKey },
  setup() {
    const contacts_list = ref<Array<Contact>>([]);
    const new_contact = ref<Omit<Contact, "id"> | null>(null);
    const edit_contact = ref<Omit<Contact, "id"> | null>(null);
    return {
      new_contact,
      edit_contact,
      contacts_list,
    };
  },
  mounted() {
    this.loadContacts();
  },
  methods: {
    loadContacts() {
      // this.axios
      //   .get<Array<Contact>, AxiosResponse<Array<Contact>>>("/api/contacts")
      //   .then((res) => {
      //     this.contacts_list = res.data;
      //   });
    },
    initNewContact() {
      this.new_contact = {
        first_name: "",
        last_name: "",
        patronimyc_name: "",
        phones: [],
      };
    },
  },
});
</script>
