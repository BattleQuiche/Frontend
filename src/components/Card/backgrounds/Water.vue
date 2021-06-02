<template>
  <div v-if="['grass-top', 'grass-bottom', 'grass-right', 'grass-left'].includes(type)"
       class="case-background resized-img" :class="rotateClasses">
    <img class="case-background" src="@/assets/map/generic-rpg-tile65.png">
    <img class="case-background" src="@/assets/map/generic-rpg-tile05.png" style="transform: rotate(90deg)">
    <img class="case-background" src="@/assets/map/generic-rpg-tile65.png">
    <img class="case-background" src="@/assets/map/generic-rpg-tile05.png" style="transform: rotate(90deg)">
  </div>
  <div v-else-if="type === 'grass-top'"
       class="case-background resized-img" :class="rotateClasses">
    <img class="case-background" src="@/assets/map/generic-rpg-tile65.png">
    <img class="case-background" src="@/assets/map/generic-rpg-tile05.png" style="transform: rotate(90deg)">
    <img class="case-background" src="@/assets/map/generic-rpg-tile65.png">
    <img class="case-background" src="@/assets/map/generic-rpg-tile05.png" style="transform: rotate(90deg)">
  </div>
  <span v-else class="case-background"/>
</template>

<script>
export default {
  name: 'Water',
  props: {
    type: String
  },
  data() {
    return {
      rotateClasses: {
        rotate90: (this.type === 'grass-bottom'),
        rotate180: (this.type === 'grass-left'),
        rotate270: (this.type === 'grass-top'),
      }
    }
  }
}
</script>

<style scoped>
  span {
    background-color: #008DF0;
    display: block;
    height: 100%;
    width: 100%;
  }

  .rotate90 {
    transform: rotate(90deg);
  }

  .rotate180 {
    transform: rotate(180deg);
  }

  .rotate270 {
    transform: rotate(270deg);
  }
</style>
