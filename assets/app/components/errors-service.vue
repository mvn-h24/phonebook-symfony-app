<template>
  <div class="errors-container">
    <TransitionGroup name="error-transition">
      <div v-for="error in errorsList" :key="error.id" class="error">
        {{ error.message }}
      </div>
    </TransitionGroup>
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { useErrorStore } from "@app/store";
import { storeToRefs } from "pinia";

export default defineComponent({
  setup() {
    const errorsStore = useErrorStore();
    const { errorsList } = storeToRefs(errorsStore);
    return {
      errorsList,
    };
  },
});
</script>

<style scoped>
.errors-container {
  position: fixed;
  top: 10px;
  right: 10px;
  z-index: 1000;
}

.error:not(:first-child) {
  margin-top: 10px;
}

.error {
  transition: 0.2s ease-in-out;
  padding: 10px;
  background: #890000;
  border-radius: 10px;
  color: white;
  font-size: 15px;
  font-weight: bold;
}

/*noinspection CssUnusedSymbol*/
.error-transition-enter-active,
.error-transition-leave-active {
  --transition-pars: all 1s ease;
  --path-length: 100px;
  transition: var(--transition-pars);
}

/*noinspection CssUnusedSymbol*/
.error-transition-enter-from,
.error-transition-leave-to {
  opacity: 0;
  transform: translateX(var(--path-length));
}
</style>
