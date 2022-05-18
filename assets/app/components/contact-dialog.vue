<template>
  <div v-if="contact" class="layout">
    <div class="dialog">
      <label>
        <span>First name</span>
        <input v-model="contact.firstName" />
      </label>
      <label>
        <span>Last name</span>
        <input v-model="contact.lastName" />
      </label>
      <label>
        <span>Patronymic name</span>
        <input v-model="contact.patronimycName" />
      </label>
      <div class="control-panel">
        <action-key @click="submit">Submit</action-key>
        <action-key @click="cancel">Cancel</action-key>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import ActionKey from "@app/ui/action-key.vue";
import { useContact, useErrorStore } from "@app/store";
import { storeToRefs } from "pinia";

export default defineComponent({
  name: "create-contact-dialog",
  components: { ActionKey },
  setup() {
    const contactStore = useContact();
    const { contact, newContact } = storeToRefs(contactStore);
    const errorStore = useErrorStore();
    return { errorStore, contact, contactStore };
  },
  methods: {
    submit() {
      let error = undefined;
      if (!this.contact.firstName) {
        error = "empty first name";
      } else if (!this.contact.lastName) {
        error = "empty last name";
      } else if (!this.contact.patronimycName) {
        error = "empty patronimyc name";
      }
      if (error) {
        this.errorStore.addError(error, 2000);
      } else {
        return this.contactStore.save().then(() => {
          this.contactStore.flush();
        });
      }
    },
    cancel() {
      return this.contactStore.flush();
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
  max-width: 500px;
  width: 90%;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  background: white;
  padding: 10px;
  border-radius: 10px;
}

label {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

label span,
label input {
  flex-basis: 200px;
  flex-grow: 1;
  flex-shrink: 2;
  box-sizing: border-box;
  max-width: 100%;
}

label:not(:first-child) {
  margin-top: 10px;
}

.control-panel {
  margin-top: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 10px;
}

.control-panel :deep(button) {
  flex-basis: 200px;
  flex-grow: 1;
}
</style>
