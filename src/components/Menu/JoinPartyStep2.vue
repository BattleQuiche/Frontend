<template>
  <div class="menu wrapper">
    <i-o-s-back-button/>

    <div class="menu__container">
      <main>
        <h1>Battle Quiche</h1>
        <h2>Rejoindre une partie</h2>
      </main>
      <aside>
        <players-list/>
        <a @click="goToParty">Entrer dans la partie ></a>
      </aside>
    </div>
  </div>
</template>

<script>
import iOSBackButton from '../../reusables/iOSBackButton'
import PlayersList from '../../reusables/PlayersList'

export default {
  name: 'JoinPartyStep2',
  components: {
    iOSBackButton,
    PlayersList
  },
  methods: {
    goToParty() {
      //  @TODO: function to navigate to Party.vue
    }
  }
}
</script>

<style scoped>

</style>
