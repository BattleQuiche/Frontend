<template>
  <div class="menu wrapper">
    <i-o-s-back-button/>

    <div class="menu__container">
      <main>
        <h1>Battle Quiche</h1>
        <h2>Création d'une partie</h2>
        <p>ID Partie: #{{$route.params.partyId}}</p>
      </main>
      <aside>
        <players-list/>
          <router-link :to="{ name: 'Party', params: { partyId } }">Lancer la partie</router-link>
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
  data() {
    return {
      partyId : 'helloworld'
    }
  }
}
</script>
