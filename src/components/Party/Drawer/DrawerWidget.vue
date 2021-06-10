<template>
    <div id="drawersContainer">
        <div id="leftDrawer" class="drawer">
            <input id="leftDrawerCheck" type="checkbox"/>
            <div id="leftDrawerContents" class="drawerContents"></div><label id="leftDrawerPull" class="drawerPull" for="leftDrawerCheck"></label>
        </div>
    </div>
</template>

<script>
export default {
  name: "DrawerWidget",
  props: {
    players: {
      type: Array,
      required: true,
    }
  },
}
</script>
