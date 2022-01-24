<template>
  <div class="current-form">
    <div class="toolbar">
      <input type="button" class="toolbar-button" @click="save" value="Сохранить"/>
    </div>
    <div class="form-controls">
      <File v-model="files" @update:model-value="save" caption="Вложения:" width="300" multiple="true"></File>
    </div>
  </div>
</template>

<script>
import File from './File.vue'
export default {
  name: 'Form',
  props: ['id'],
  data: function () {
    return {
      files: []
    }
  },
  components: { File },
  methods: {
    load () {
      fetch(`http://localhost:3420/document/${this.id}`, { method: 'GET' })
          .then(res => res.json())
          .then(data => {
            this.files = data.files || []
          })
    },
    save () {
      const body = new FormData()
      this.files.forEach(file => body.append(file.name, file.id ? JSON.stringify(file) : file))
      console.debug(body)
      fetch(`http://localhost:3420/document/${this.id}`, { method: 'POST', body })
    }
  },
  mounted () {
    this.load()
  }
}
</script>

<style scoped>
  .current-form {
    display: flex;
    flex: 1 1 25vw;
    border: #bfc0da solid;
    flex-direction: column;
  }

  .toolbar {
    display: flex;
    width: 100%;
  }

  .toolbar > * {
    margin: 5pt;
  }

  .toolbar-button {
    height: 2em;
  }

  .form-controls {
    display: flex;
  }
</style>
