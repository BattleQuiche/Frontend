<template>
  <div v-if="buttonIsEnabled" id="ios-back-button">
    <a @click="back">
      <svg
        enable-background="new 0 0 24 24"
        fill="#000000"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect fill="none" height="24" width="24" />
        <polygon points="17.77,3.77 16,2 6,12 16,22 17.77,20.23 9.54,12" />
      </svg>
    </a>
  </div>
</template>

<script>
export default {
  name: 'iOSBackButton',
  data() {
    return {
      buttonIsEnabled: false,
    };
  },
  mounted() {
    this.buttonIsEnabled = !!navigator.platform.match(/iPhone|iPod|iPad/);
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style scoped>
#ios-back-button {
  align-self: start;
  width: 100vw;
}

#ios-back-button a {
  cursor: pointer;
  height: 60px;
  width: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

#ios-back-button a svg {
  height: 30px;
  width: 30px;
}
</style>
