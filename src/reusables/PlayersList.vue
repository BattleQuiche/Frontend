<template>
  <div class="players">
    <div class="players__list">
      <p>Joueur 1</p>
      <p>Joueur 2</p>
    </div>
    <p class="players__vs">VS</p>
    <div class="players__list">
      <p>Joueur 3</p>
      <p>+</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayersList'
}
</script>

<style scoped>
.players {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}

.players__list {
  display: flex;
}

.players__list p {
  margin: 0 25px;
  flex: 1;
  text-align: center;
}

.players .players__vs {
  font-size: 70px;
  margin: 10px 50px;
  text-align: center;
}

.players p:nth-of-type(3) {
  text-align: right;
}
</style>
