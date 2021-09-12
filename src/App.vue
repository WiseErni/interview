<template>
  <div id="mainContent" class="main-content">
    <MainMenu/>
    <Form id="1"/>
  </div>
</template>

<script>
import MainMenu from './components/MainMenu.vue'
import Form from './components/Form.vue'

export default {
  name: 'App',
  components: { Form, MainMenu }
}
</script>

<style scoped>
  .main-content {
    display: flex;
    flex: 1 1 35vw;
    height: 100%
  }
</style>
