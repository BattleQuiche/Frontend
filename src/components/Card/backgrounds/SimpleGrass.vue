<template>
  <div class="case-background resized-img">
    <img src="@/assets/map/generic-rpg-tile70.png">
    <img src="@/assets/map/generic-rpg-tile70.png">
    <img src="@/assets/map/generic-rpg-tile70.png">
    <img src="@/assets/map/generic-rpg-tile70.png">
  </div>
</template>

<script>
export default {
  name: 'SimpleGrass'
}
</script>

<style>
  .resized-img {
    display: flex;
    flex-wrap: wrap;
  }

  .resized-img img {
    flex: 1;
    max-width: 50%;
  }
</style>
