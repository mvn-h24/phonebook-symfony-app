<template>
  <div class="notification">
    <slot />
  </div>
</template>

<script>
export default {
  name: "text-notify",
};
</script>

<style scoped>
.notification {
  padding: 10px 15px 10px 30px;
  border-radius: 10px;
  background: #4d4dff;
  color: white;
  font-weight: bold;
  font-size: 25px;
  letter-spacing: 1px;
}
</style>
