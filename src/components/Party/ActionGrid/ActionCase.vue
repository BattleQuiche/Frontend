<template>
  <span class="grid__case_content" :class="{ [this.caseData]: true }" @click="handleMoveGrid"/>
</template>

<script>
class Type {
  static MOVE = 'movable';
  static EMPTY = 'empty';
}

export default {
  name: 'ActionCase',
  props: {
    caseData: {
      type: String,
      required: true,
    },
    x: {
      type: Number,
      required: true,
    },
    y: {
      type: Number,
      required: true,
    },
  },
  methods: {
    handleMoveGrid() {
      if (this.caseData !== Type.MOVE) {
        return
      }

      this.$emit('player-action', { x: this.x, y: this.y })
    }
  },
  Type,
}
</script>

<style scoped>
  .grid__case_content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
  }

  .movable {
    background-color: rgba(0, 0, 0, .3);
  }

  .movable:hover {
    background-color: rgba(0, 0, 0, .5);
    cursor: pointer;
  }
</style>
