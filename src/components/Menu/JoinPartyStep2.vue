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
        <button @click="initParty">Enter dans la partie</button>
        <router-link :to="{ name: 'Party', params: { partyId } }">Entrer dans la partie</router-link>
      </aside>
    </div>
  </div>
</template>

<script>
import iOSBackButton from '../../reusables/iOSBackButton'
import PlayersList from '../../reusables/PlayersList'
import {mapActions} from "vuex";

export default {
  name: 'JoinPartyStep2',
  components: {
    iOSBackButton,
    PlayersList
  },
  data() {
    return {
      partyId : String(this.$route.params.partyId),
    }
  },
  methods: {
    ...mapActions(['setParty']),
    async initParty() {
      const URL = `https://wars.quiches.ovh/api/party/${this.partyId}/details`
      try {
        const party = await this.$http.get(URL)
        this.setParty(party.data)
        await this.$router.push({ name: 'Party', params: { partyId: this.partyId}})
      } catch (err) {
        console.log(err);
      }
    }
  }
}
</script>

<style scoped>

</style>
