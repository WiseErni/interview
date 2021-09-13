<template>
  <label class="file-link-container">
    <a class="file-link" v-bind:href="url" v-bind:download="this.file.name">{{ file.name }}</a>
    <img class="file-remove-button" src="../../public/remove.png" alt="X" @click="removeFile"/>
    <slot></slot>
  </label>
</template>

<script>
export default {
  name: 'FileLink',
  props: ['file', 'index'],
  computed: {
    url () {
      if (this.file.id) {
        return `http://localhost:3420/file/${this.file.id}`
      } else {
        return window.URL.createObjectURL(new Blob([this.file], { type: this.file.type }))
      }
    }
  },
  methods: {
    removeFile() {
      this.$emit('remove-file', this.index)
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

.file-remove-button:hover {
  background-color: #d38184;
}
</style>
