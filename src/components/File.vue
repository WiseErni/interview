<template>
  <div class="file" :style="cssProps">
    <p v-if="caption" class="caption">{{caption}}</p>
    <div class="file-value">
      <FileLink v-for="(file, index) in value"
                v-bind:index="index"
                v-bind:key="file.name + index"
                v-bind:file="file"
                v-on:remove-file="removeFile">
        <span v-if="index !== value.length - 1 ">;</span>
      </FileLink>
    </div>
    <label class="file-select-button">
      <img src="../../public/paperclip.png" alt="Выбор" class="file-select-image"/>
      <input type="file" class="file-select-dialog" @change="handleFileChange">
    </label>
  </div>
</template>

<script>
import FileLink from './FileLink.vue'
export default {
  name: 'File',
  props: ['value', 'multiple', 'caption', 'width'],
  computed: {
    cssProps: function () {
      return {
        '--control-width': this.width + 'pt'
      }
    }
  },
  methods: {
    handleFileChange: function (event) {
      const selectedFile = event.target.files[0]
      console.log(selectedFile)
      if (this.multiple) {
        this.$emit('input', this.value.concat([selectedFile]))
      } else {
        this.$emit('input', [selectedFile])
      }
    },
    removeFile(index) {
      this.value.splice(index, 1)
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
  align-items: flex-start;
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
  flex-direction: row;
}

.file > label {
  display: flex;
}

.file-select-dialog {
  display: none;
}
</style>
