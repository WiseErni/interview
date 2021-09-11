<template>
  <div class="file" :style="cssProps">
    <p v-if="caption" class="caption">{{caption}}</p>
    <div class="file-value">
      <FileLink v-for="file in filesList" v-bind:key="file.id" v-bind:fileName="file.name"></FileLink>
    </div>
    <label class="file-select-button">
      <img src="../../public/paperclip.png" alt="Выбор" class="file-select-image"/>
      <input type="file" :multiple="multiple" class="file-select-dialog" @change="handleFileChange">
    </label>
  </div>
</template>

<script>
import FileLink from './FileLink.vue'
export default {
  name: 'File',
  props: ['value', 'multiple', 'caption', 'width'],
  computed: {
    filesList: function () {
      const filesArray = []
      const files = this.value || []
      for (let i = 0; i < files.length; i++) {
        filesArray.push(Object.assign(files[i], { id: 'virtual'+ i }))
      }
      return filesArray
    },
    cssProps: function () {
      return {
        '--control-width': this.width + 'pt'
      }
    }
  },
  methods: {
    handleFileChange: function (event) {
      this.$emit('input', event.target.files)
    }
  },
  components: {FileLink}
}
</script>

<style scoped>
.file {
  display: flex;
  flex-direction: row;
  margin: 5pt;
  height: 1.5em;
  justify-content: flex-start;
  gap: 5pt;
  align-items: center;
}

.file-value {
  height: 1.5em;
  width: var(--control-width);
  flex-wrap: wrap;
  align-self: flex-start;
  overflow: hidden;
}

.caption {
  display: flex;
  margin-top: 0;
  margin-bottom: 0;
}

.file-select-image {
  height: 1.5em;
  width: 1.5em;
}

.file > div {
  display: flex;
  align-items: center;
  flex-direction: row;
}

.file > label {
  display: flex;
}

.file-select-dialog {
  display: none;
}
</style>
