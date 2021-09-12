<template>
  <label class="file-link-container">
    <span class="file-link" v-on:click="downloadFile">{{ fileName }}</span>
    <img class="file-remove-button" src="../../public/remove.png" alt="X"/>
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'FileLink',
  props: ['fileName'],
  methods: {
    downloadFile () {
      console.log('Will download!')
      return false
    }
  }
}
</script>

<style scoped>
.file-link {
  color: #0000EE;
  text-decoration: underline;
  cursor: pointer;
}

.file-link-container {
  margin-left: 4pt;
  margin-top: 2pt;
  display: flex;
  gap: 2.5pt;
  align-items: center;
}
.file-remove-button {
  width: 0.8em;
  height: 0.8em;
}
</style>
