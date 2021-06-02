<template>
  <div class="inventory">
    <div v-for="item in inventory" :key="item.id" class="inventory--item">
      <img :src="item.imageURL" alt="urlForImage" :title="item.title" @click="clickOnItem(item)">
    </div>
  </div>
</template>

<script>
export default {
  name: "InventoryBarWidget",
  data() {
    return {
      inventory: [{id:"1234", title: "Objet 1", imageURL: "https://via.placeholder.com/80"},
        {id:"12323", title: "Objet 2", imageURL: "https://via.placeholder.com/80"},
        {id:"123456cc2", title: "Objet 3", imageURL: "https://via.placeholder.com/80"}],
    }
  },
  methods: {
    clickOnItem(item) {
      console.log(`l'id de l'objet est ${item.id}`)
    }
  }
}
</script>

<style scoped>

.inventory {
  background-color: lightgray;
  display: flex;
  border: 1px black solid;
}

.inventory--item {
  min-height: 30px;
  margin: 0 10px;
  border: 1px red solid;
}
</style>
