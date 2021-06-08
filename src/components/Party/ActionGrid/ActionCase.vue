<template>
  <span class="grid__case_content" :class="{ [this.caseData]: true }" @click="handleAction"/>
</template>

<script>
class Type {
  static MOVE = 'movable';
  static EMPTY = 'empty';
}

export default {
  name: 'ActionCase',
  props: {
    caseData: { type: String,  required: true },
    x: { type: Number,  required: true },
    y: { type: Number,  required: true },
  },
  methods: {
    handleAction() {
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
  .movable {
    background-color: rgba(0, 0, 0, .3);
  }

  .movable:hover {
    background-color: rgba(0, 0, 0, .5);
    cursor: pointer;
  }
</style>
