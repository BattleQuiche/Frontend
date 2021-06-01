<template>
  <div v-if="buttonIsEnabled">
    <a @click="back">Back</a>
  </div>
</template>

<script>
export default {
  name: 'iOSBackButton',
  data() {
    return {
      buttonIsEnabled: false
    }
  },
  mounted () {
    this.buttonIsEnabled = !!navigator.platform.match(/iPhone|iPod|iPad/)
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
