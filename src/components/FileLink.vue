<template>
  <div class="file-link-container">
    <a class="file-link">{{ fileName }}</a>
    <img class="file-remove-button" src="../../public/remove.png" alt="X"/>
  </div>
</template>

<script>
export default {
  name: 'FileLink',
  props: ['fileName']
}
</script>

<style scoped>
.file-link {
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
