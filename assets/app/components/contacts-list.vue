<template>
  <table>
    <tbody>
      <tr v-for="contact in list" :key="contact.id">
        <td>
          {{
            `${contact.first_name} ${contact.last_name} ${contact.patronimyc_name}`
          }}
        </td>
        <td>
          <template v-if="contact.phones.length">
            <ul>
              <li v-for="phone in contact.phones" :key="phone.id">
                <span>{{ phone.phone_number }}</span> -
                <span>{{ phone.comment }}</span>
              </li>
            </ul>
          </template>
        </td>
        <td>
          <button @click="callEdit(contact)">edit</button>
          <button @click="callDelete(contact.id)">delete</button>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import { defineComponent, PropType } from "vue";
import { Contact } from "@app/types";

export default defineComponent({
  name: "contacts-list",
  props: {
    list: Array as PropType<Array<Contact>>,
  },
  methods: {
    callDelete(contactId: number): void {
      this.$emit("call-delete", contactId);
    },
    callEdit(contact: Contact): void {
      this.$emit("call-edit", contact);
    },
  },
});
</script>

<style scoped>
div {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
}
</style>
