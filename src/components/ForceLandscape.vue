<template>
  <div v-if="modalIsOpen">
    <p>Tournez votre écran pour passer en mode paysage.</p>
  </div>
</template>

<script>
export default {
  name: 'ForceLandscape',
  components: {},
  data() {
    return {
      modalIsOpen: false
    }
  },
  mounted () {
    this.landscapeVerification()
    window.addEventListener('resize', this.landscapeVerification);
  },
  methods: {
    landscapeVerification() {
      console.log('window.innerHeight', window.innerHeight)
      console.log('window.innerWidth', window.innerWidth)
      this.modalIsOpen = (window.innerHeight > window.innerWidth)
    }
  }
}
</script>

<style scoped>
  div {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    background-color: black;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  p {
    color: white;
    font-size: 20px;
  }
</style>
