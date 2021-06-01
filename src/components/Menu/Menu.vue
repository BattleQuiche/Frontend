<template>
  <div class="menu">
    <main>
      <h1>Battle Quiche</h1>
    </main>
    <aside>
      <a @click="goToCreateParty">Créer une partie</a>
      <a @click="goToJoinParty">Rejoindre une partie</a>
    </aside>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    goToJoinParty() {
      //  @TODO: function to navigate to JoinParty.vue
    },
    goToCreateParty() {
      //  @TODO: function to navigate to CreateParty.vue
    }
  }
}
</script>

<style>
  .menu {
    display: flex;
    height: 100vh;
    width: 100vw;
  }

  .menu main,
  .menu aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
  }

  .menu a {
    margin: 20px 0;
    cursor: pointer;
  }
</style>
