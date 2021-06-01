<template>
  <div v-if="buttonIsEnabled">
    <a @click="back">Back</a>
    <p>{{ stringValue }}</p>
  </div>
</template>

<script>
export default {
  name: 'iOSBackButton',
  data() {
    return {
      buttonIsEnabled: false,
      stringValue: ''
    }
  },
  mounted () {
    // this.buttonIsEnabled = !!navigator.platform.match(/iPhone|iPod|iPad/)
    this.buttonIsEnabled = true
    this.stringValue = navigator.platform
  },
  methods: {
    back() {
      //  call back navigation function with vue-router
    }
  }
}
</script>

<style scoped>
  a {
    cursor: pointer;
  }
</style>
