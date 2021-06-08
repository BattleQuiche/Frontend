<template>
  <div class="inventory">
    <div v-for="key in Array(5).keys()" :key="'item_'+key" class="inventory__item"
         :class="{ active: (selectedItem === inventory[key]) }" @click="clickOnItem(inventory[key])">
      <img :data="key" v-if="!!inventory[key]" :src="inventory[key].imageURL" alt="urlForImage" :title="inventory[key].title" />
    </div>
  </div>
</template>

<script>
export default {
  name: "InventoryBarWidget",
  props: {
    inventory: {
      type: Array,
      required: true,
    },
    selectedItem: {
      type: Object
    }
  },
  methods: {
    clickOnItem(item) {
      if (!item) {
        return
      }
      this.$emit('select-item', item)
    }
  }
}
</script>

<style scoped>

.inventory {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  z-index: 50;
  background-color: lightgray;
  display: flex;
  box-shadow: 0 0 20px 8px rgba(0, 0, 0, 0.2);
  padding: 10px;
}

.inventory__item {
  position: relative;
  width: 7vw;
  height: 7vw;
  max-width: 80px;
  max-height: 80px;
  margin: 0 5px;
  background-color: gray;
  box-shadow: inset 5px 5px 12px 6px rgba(0, 0, 0, 0.25);
  cursor: pointer;
}

.inventory__item::before {
  z-index: 1;
  display: block;
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  height: 100%;
  transform: translate(-50%, -50%);
  border: 1px solid black;
  transition: border 0.5s;
}

.inventory__item.active::before {
  border: 3px solid black;
}

.inventory__item img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.inventory__item:first-of-type {
  margin-left: 0;
}

.inventory__item:last-of-type {
  margin-right: 0;
}
</style>
