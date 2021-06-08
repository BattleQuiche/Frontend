<template>
  <div class="grid__case_content">
    <img v-if="caseData === 'player_icon_1'" src="@/assets/players/player_icon_1.png" alt="">
    <img v-else-if="caseData === 'player_icon_2'" src="@/assets/players/player_icon_2.png" alt="">
    <img v-else-if="caseData === 'player_icon_3'" src="@/assets/players/player_icon_3.png" alt="">
    <img v-else-if="caseData === 'player_icon_4'" src="@/assets/players/player_icon_4.png" alt="">
  </div>
</template>

<script>
export default {
  name: 'PlayerCase',
  props: {
    caseData: { type: String },
  }
}
</script>

<style scoped>
.grid__case_content img {
  max-width: 100%;
  max-height: 100%;
}
</style>
