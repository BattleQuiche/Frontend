<template>
  <div class="menu wrapper">
    <i-o-s-back-button/>

    <div class="menu__container">
      <main>
        <h1>Battle Quiche</h1>
        <h2>Création d'une partie</h2>
      </main>
      <aside>
        <div class="players">
          <div class="players__list">
            <p>Joueur 1</p>
            <p>Joueur 2</p>
          </div>
          <p class="vs">VS</p>
          <div class="players__list">
            <p>Joueur 3</p>
            <p>+</p>
          </div>
        </div>
        <a @click="goToParty">Lancer la partie ></a>
      </aside>
    </div>
  </div>
</template>

<script>
import iOSBackButton from '../iOSBackButton'

export default {
  name: 'CreateParty',
  components: {
    iOSBackButton,
  },
  methods: {
    goToParty() {
      //  @TODO: function to navigate to Party.vue
    }
  }
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

  .players .vs {
    font-size: 70px;
    margin: 10px 50px;
    text-align: center;
  }

  .players p:nth-of-type(3) {
    text-align: right;
  }
</style>
