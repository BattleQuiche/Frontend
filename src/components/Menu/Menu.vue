<template>
  <div class="menu wrapper">
   <div class="menu__container">
     <main>
       <h1>Battle Quiche</h1>
     </main>
     <aside>
      <router-link :to="{ name: 'CreateParty' }">Créer une partie</router-link>
      <router-link :to="{ name: 'JoinPartyStep1' }">Rejoindre une partie</router-link>
     </aside>
   </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
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
