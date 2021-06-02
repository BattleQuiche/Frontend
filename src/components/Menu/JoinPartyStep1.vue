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
        <router-link :to="{ name: 'JoinPartyStep2', params: { partyId } }">Entrer dans la partie</router-link>
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
  data() {
    return {
      partyId : 'helloworld1'
    }
  }
}
</script>

<style scoped>

</style>
