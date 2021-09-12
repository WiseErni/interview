<template>
  <div class="current-form">
    <input type="button" @click="save" value="Сохранить" style="height: 1.5em">
    <File v-model="files" caption="Вложения:" width="300" multiple="true"></File>
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
      this.files.forEach(file => body.append(file.name, file))
      console.debug(body)
      fetch(`http://localhost:3420/document/${this.id}`, { method: 'POST', body })
    }
  },
  mounted () {
    this.load()
  },
  updated () {
    // this.save()
  }
}
</script>

<style scoped>
  .current-form {
    display: flex;
    flex: 1 1 25vw;
    border: aqua solid;
  }
</style>
