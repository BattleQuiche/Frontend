<template>
  <div class="menu wrapper">
    <i-o-s-back-button/>

    <div class="menu__container">
      <main>
        <h1>Battle Quiche</h1>
        <h2>Création d'une partie</h2>
        <p>ID Partie: #A3BC9H</p>
      </main>
      <aside>
        <players-list/>
        <a @click="goToParty">Lancer la partie ></a>
      </aside>
    </div>
  </div>
</template>

<script>
import iOSBackButton from '../../reusables/iOSBackButton'
import PlayersList from '../../reusables/PlayersList'

export default {
  name: 'CreateParty',
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
