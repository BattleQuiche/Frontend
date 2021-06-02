<template>
  <div class="menu wrapper">
   <div class="menu__container">
     <main>
       <h1>Battle Quiche</h1>
     </main>
     <aside>
       <a @click="goToCreateParty">Créer une partie</a>
       <a @click="goToJoinParty">Rejoindre une partie</a>
     </aside>
   </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    goToJoinParty() {
      //  @TODO: function to navigate to JoinPartyStep2.vue
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
    flex-direction: column;
  }

  .menu__container {
    display: flex;
    flex: 1;
  }

  .menu__container #ios-back-button {
    width: 100vw;
  }

  .menu__container main,
  .menu__container aside {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
    padding: 30px;
  }

  .menu__container a {
    margin: 20px 0;
    cursor: pointer;
  }
</style>
