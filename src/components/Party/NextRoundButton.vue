<template>
  <button class="buttonEndTurn" @click="endRound">Terminer le tour.</button>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'NextRoundButton',
  methods: {
    async endRound() {
      try {
        await this.$http.post(
          `${this.$env.VUE_APP_API_BASE_URL}/party/next-round`,
          {
            partyId: this.party.partyId,
            userId: this.user._id,
          },
        );

        console.log('gfhjdik');
      } catch (e) {
        console.log(e);
      }
    },
  },
  computed: {
    ...mapGetters(['party', 'user']),
  },
};
</script>

<style scoped>
.buttonEndTurn {
  position: fixed;
  bottom: 0;
  left: 85%;
  transform: translateX(-50%);
  z-index: 50;
  background-color: lightgray;
  padding: 18px;
}
</style>
