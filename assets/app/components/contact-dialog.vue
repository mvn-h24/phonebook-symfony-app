<template>
  <div class="layout">
    <div class="dialog">
      <label>
        <span>First name</span>
        <input v-model="editedContact.first_name" />
      </label>
      <label>
        <span>Last name</span>
        <input v-model="editedContact.last_name" />
      </label>
      <label>
        <span>Patronymic name</span>
        <input v-model="editedContact.patronimyc_name" />
      </label>

      <ActionKey class="add-phone" @click="initNewPhone">add phone</ActionKey>
      <ul v-if="editedContact.phones.length || newPhone">
        <li v-if="newPhone">
          <label>
            <span>phone number</span>
            <input v-model="newPhone.phone_number" />
          </label>
          <label>
            <span>phone comment</span>
            <input v-model="newPhone.comment" />
          </label>
          <ActionKey @click="saveNewPhone">save phone</ActionKey>
        </li>
        <li v-for="phone in editedContact.phones" :key="phone.id">
          <label>
            <span>phone number</span>
            <input :value="phone.phone_number" />
          </label>
          <label>
            <span>phone comment</span>
            <input :value="phone.comment" />
          </label>
        </li>
      </ul>
      <ActionKey class="submit-save" @click="saveContact"
        >save contact
      </ActionKey>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import { Contact, Phone } from "@app/types";
import ActionKey from "@app/ui/action-key.vue";

export default defineComponent({
  name: "contact-dialog",
  components: { ActionKey },
  setup(props) {
    const newPhone = ref<Omit<Phone, "id" | "contact"> | null>(null);
    const editedContact = ref<Contact | Omit<Contact, "id">>(props.contact);
    return { newPhone, editedContact };
  },
  props: {
    contact: {
      type: Object as PropType<Contact | Omit<Contact, "id">>,
      required: true,
    },
  },
  methods: {
    initNewPhone() {
      this.newPhone = { comment: "", phoneNumber: "", phone_number: "" };
    },
    saveNewPhone() {
      if (this.newPhone?.comment.length && this.newPhone?.phone_number.length) {
        // this.contact.phones.push(this.newPhone as Phone);
        this.newPhone = null;
      }
    },

    saveContact() {
      // this.axios.post("/api/post-contact-full", this.contact).then((res) => {
      //   console.log(res);
      // });
    },
  },
});
</script>

<style scoped>
.layout {
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.dialog {
  width: 500px;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: white;
  padding: 10px;
  border-radius: 10px;
}

.submit-save {
  margin-top: auto;
}
</style>
