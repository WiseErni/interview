<template>
  <div class="current-form">
    <File/>
  </div>
</template>

<script>
import File from './File.vue'
export default {
  name: 'Form',
  components: { File }
}
</script>

<style scoped>
  .current-form {
    display: flex;
    flex: 1 1 25vw;
    border: aqua solid;
  }
</style>
