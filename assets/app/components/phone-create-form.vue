<template>
  <div v-if="phone">
    <label>
      <span>Phone number</span>
      <input v-model="phone.phoneNumber" />
    </label>
    <label>
      <span>Comment</span>
      <input v-model="phone.comment" />
    </label>
    <action-key @click="save">Save phone</action-key>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useErrorStore, usePhoneNumber } from "@app/store";
import { storeToRefs } from "pinia";
import ActionKey from "@app/ui/action-key.vue";

export default defineComponent({
  name: "phone-create-form",
  components: { ActionKey },
  setup() {
    const pnStore = usePhoneNumber();
    const { phone } = storeToRefs(pnStore);
    const errorStore = useErrorStore();
    return {
      phone,
      errorStore,
      pnStore,
    };
  },
  methods: {
    save() {
      let error = undefined;
      if (!this.phone.phoneNumber) {
        error = "empty phone number";
      } else if (!this.phone.comment) {
        error = "empty comment";
      }
      if (error) {
        this.errorStore.addError(error, 2000);
      } else {
        return this.pnStore.save().then(() => {
          this.pnStore.flush();
        });
      }
    },
  },
  props: {
    contact_id: {
      type: Number,
      required: true,
    },
  },
});
</script>

<style scoped>
div label span,
div label input {
  flex-basis: 200px;
  flex-grow: 1;
  flex-shrink: 2;
  box-sizing: border-box;
  max-width: 100%;
}

div label {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

div {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>
