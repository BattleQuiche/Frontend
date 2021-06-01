<template>
  <div class="menu">
    <main>
      <h1>Battle Quiche</h1>
      <h2>Création d'une partie</h2>
    </main>
    <aside>
      <div class="players">
        <p>Joueur 1</p>
        <p class="vs">VS</p>
        <p>Joueur 2</p>
      </div>
      <a @click="startParty">Lancer la partie ></a>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'CreateParty',
  methods: {
    startParty() {
      //  @TODO: function to navigate to Party.vue
    }
  }
}
</script>

<style scoped>
  div.players {
    display: flex;
    flex-direction: column;
    margin-bottom: 50px;
  }

  div.players p.vs {
    font-size: 70px;
    margin: 10px 50px;
  }

  div.players p:nth-of-type(3) {
    text-align: right;
  }
</style>
