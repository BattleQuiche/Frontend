<template>
  <div>
    <h1>Start a game</h1>
    <p>This is the start a game page</p>

    <router-link :to="{ name: 'Home' }">Go back home</router-link>
  </div>
</template>

<script>
export default {
    name: "StartGame"
};
</script>