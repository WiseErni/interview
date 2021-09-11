<template>
  <div class="current-form">
    <File :multiple="true" v-model="files" caption="Вложения:" width="300"></File>
  </div>
</template>

<script>
import File from './File.vue'
export default {
  name: 'Form',
  data: function () {
    return {
      files: null
    }
  },
  components: { File },
  methods: {
    save: function () {

    }
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
