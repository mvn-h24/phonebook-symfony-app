<template>
  <button>
    <slot />
  </button>
</template>

<style>
button {
  background: green;
  border: none;
  color: white;
  border-radius: 6px;
  padding: 5px 10px;
  transition: 0.5s ease-in-out;
  cursor: pointer;
}

button:hover {
  background: greenyellow;
  color: #3d3d3d;
  box-shadow: 3px 3px 5px black;
}
</style>
