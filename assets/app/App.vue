<template>
  <phone-book class="app-centered" />
  <errors-service />
</template>

<!--suppress CssUnusedSymbol -->
<style>
html,
body,
#app {
  padding: 0;
  margin: 0;
  min-height: 100vh;
}

* {
  font-family: sans-serif;
  font-size: 20px;
}

#app {
  display: flex;
}

.app-centered {
  margin: auto;
}
</style>

<script lang="ts">
import { defineComponent } from "vue";
import PhoneBook from "@app/ui/phone-book.vue";
import ErrorsService from "@app/ui/errors-service.vue";

export default defineComponent({
  components: { ErrorsService, PhoneBook },
});
</script>
