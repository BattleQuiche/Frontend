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
          <button @click="createParty">Lancer la partie !</button>
      </aside>
    </div>
  </div>
</template>

<script>
import iOSBackButton from '../../reusables/iOSBackButton'
import PlayersList from '../../reusables/PlayersList'
import {mapActions, mapGetters} from "vuex";

export default {
  name: 'CreateParty',
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
    async createParty() {
      const URL_PLAYER = `${this.$env.VUE_APP_API_BASE_URL}/party/${this.partyId}/add-player`
      const URL_PARTY = `${this.$env.VUE_APP_API_BASE_URL}/party/${this.partyId}/details`
      try {
        await this.$http.post(URL_PLAYER, {userId: this.user._id})

        const party = await this.$http.get(URL_PARTY)
        this.setParty(party.data)
        await this.$router.push({name: 'Party', params: {partyId: this.partyId}})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
}
</script>
