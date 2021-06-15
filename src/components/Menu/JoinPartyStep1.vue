<template>
  <div class="menu wrapper">
    <i-o-s-back-button/>

    <div class="menu__container">
      <main>
        <h1>Battle Quiche</h1>
        <h2>Rejoindre une partie</h2>
      </main>
      <aside>
        <input v-model="partyId" type="text" placeholder="code partie">
        <button @click="joinParty">Entrer dans la partie</button>
      </aside>
    </div>
  </div>
</template>

<script>
import iOSBackButton from '../../reusables/iOSBackButton'
import {mapGetters} from "vuex";

export default {
  name: 'JoinPartyStep1',
  components: {
    iOSBackButton,
  },
  data() {
    return {
      partyId : ''
    }
  },
  methods: {
    async joinParty() {
      const URL = `https://wars.quiches.ovh/api/party/${this.partyId}/add-player`
      try {
        await this.$http.post(URL, {userId: this.user._id})
        await this.$router.push({ name: 'JoinPartyStep2', params: { partyId: this.partyId}})

      } catch (err) {
        console.log(err)
        this.partyId = ''
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
}
</script>

<style scoped>

</style>
