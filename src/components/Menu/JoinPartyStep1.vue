<template>
  <div class="menu wrapper">
    <i-o-s-back-button/>

    <div class="menu__container">
      <main>
        <h1>Battle Quiche</h1>
        <h2>Rejoindre une partie</h2>
      </main>
      <aside>
        <input type="text" placeholder="code partie">
        <a @click="goToStep2">Entrer dans la partie ></a>
      </aside>
    </div>
  </div>
</template>

<script>
import iOSBackButton from '../../reusables/iOSBackButton'

export default {
  name: 'JoinPartyStep1',
  components: {
    iOSBackButton,
  },
  methods: {
    goToStep2() {
      //  @TODO: function to navigate to JoinPartyStep2.vue
    }
  }
}
</script>

<style scoped>

</style>
