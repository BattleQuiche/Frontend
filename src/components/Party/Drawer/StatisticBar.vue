<template>
  <div class="statisticBar">
    <div class="statisticBarBg">
      <div
        v-for="key in Array(maxPoints).keys()"
        :key="'item2_' + key"
        class="statisticElement"
      >
        <div v-if="type == 'health'" class="heartEmpty">&#9829;</div>
        <div v-else class="statDotEmpty" />
      </div>
    </div>
    <div class="statisticBarData">
      <div
        v-for="key in movementPoints"
        :key="'item3_' + key"
        class="statisticElement"
      >
        <div v-if="type == 'health'" class="heart">&#9829;</div>
        <div v-else class="statDot" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'StatisticBar',
  props: {
    movementPoints: {
      type: Number,
      required: true,
    },
    type: { type: String },
    maxPoints: { type: Number },
  },
};
</script>

<style scoped>
.statisticBar {
  margin-top: 3px;
  display: flex;
  flex-direction: column;
}

.statisticBarData {
  display: flex;
  flex-direction: row;
  position: fixed;
}

.statisticBarBg {
  display: flex;
  flex-direction: row;
  position: relative;
}

.statDotEmpty {
  width: 10px;
  height: 10px;
  background-color: darkgray;
  border-radius: 100%;
  margin: 1px;
}

.statDot {
  width: 10px;
  height: 10px;
  background-color: white;
  border-radius: 100%;
  margin: 1px;
}

.statisticElement {
  margin: 1px;
}

.heart {
  color: red;
}

.heartEmpty {
  color: rgb(172, 172, 172);
}
</style>
