<template><div class="menu">
  <main>
    <h1>Battle Quiche</h1>
    <h2>Rejoindre une partie</h2>
  </main>
  <aside>
    <input type="text" placeholder="code partie">
    <a @click="goToParty">Rejoindre la partie ></a>
  </aside>
</div>
</template>

<script>
export default {
  name: 'JoinParty',
  methods: {
    goToParty() {
      //  @TODO: function to navigate to Party.vue
    }
  }
}
</script>

<style scoped>

</style>
