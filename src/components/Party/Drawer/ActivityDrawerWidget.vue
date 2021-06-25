<template>
    <div id="drawersContainer">
        <div id="rightDrawer" class="drawer">
            <input id="rightDrawerCheck" type="checkbox"/>
            <div id="rightDrawerContents" class="drawerContents">
                    <div v-for="action in actions" :key="action.id" class="drawer_item">
                        <div class="stack">
                            <div class="playerLine">
                                <!-- <img class="playerAvatar" :src="`/players/${player.icon}.png`" :alt="`${player.icon}.png`"> -->
                                <!-- v-if="action.userId === user._id"    <label ><small>(You)</small></label> -->
                                <div class="playerName"><strong>{{ action.type }}</strong></div>
                            </div>
                        </div>
                    </div>
            </div><label id="rightDrawerPull" class="drawerPull" for="rightDrawerCheck"></label>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  name: "StatDrawerWidget",
  props: {
    actions: {
      type: Array,
      required: true
    }
  },
  computed: {
    ...mapGetters(['user']),
  }
}
</script>

<style scoped>
#drawersContainer {
	width: 50%;
	height: 50%;
	position: absolute;
	top: 20%;
    z-index: 998;
	right: 0;
	overflow: hidden;
    pointer-events: none;
}

.drawer {
	width: 100%;
	height: 100%;
	position: absolute;
	top: 0;
    pointer-events: none;
}

.drawer * {
  pointer-events: auto;
}

.drawer > input[type=checkbox] {
	display: none;
}

.drawerPull {
	display: inline-block;
    position: fixed;
	width: 40px;
    height: 60px;
	background: DarkGray;
	text-align: center;
	font-weight: bold;
	font-size: 1.2em;
	vertical-align: top;
    margin-top: 100px;
    box-shadow: 1px 2px 8px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 20px 0% 0% 20px;
}

.drawerContents {
	position: fixed;
	top: 0;
	height: 100%;
    border-radius: 20px 0% 0% 20px;
}

.drawerPull {
	position: fixed;
	top: 50%;
    right: 0;

}

.drawerPull:after {
	content: "";
}

.drawer_item {
    position: relative;
    text-align: center;
    border-radius: 7px;
    width: 14vw;
    height: 10vw;
    max-width: 130px;
    max-height: 30px;
    margin-right: 60px;
    margin-bottom: 55px;
    margin-top: 23px;
    background-color: gray;
    cursor: pointer;
    box-shadow: 2px 0px 4px 2px darkgray;
    padding: 1px;
}

.playerLine {
    display: flex;
    flex-direction: row;
    margin-right: 5px;
}

.playerName {
    color: white;
    margin-top:4px;
    margin-right: 10px;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
}

.playerAvatar {
    width: 26px;
    height: 26px;
    margin-top: 1px;
}

.stack {
    display: flex;
    flex-direction: column;
}

#rightDrawer {
	right: -200px;
}
#rightDrawerContents {
    margin-top: 10%;
	right: -200px;
	width: 200px;
	background-color: lightGray;
	transition-property: right;
	transition-duration: 0.5s;
    transition-timing-function: linear;
}
#rightDrawerPull {
	right: 0px;
	transition-property: right;
	transition-duration: 0.5s;
    transition-timing-function: linear;
}
#rightDrawerPull:after {
	content: "\2039";
    color: white;
}
#rightDrawerCheck:checked + #rightDrawerContents {
	right: 0px;
}
#rightDrawerCheck:checked + #rightDrawerContents + #rightDrawerPull {
	right: 200px;
}
#rightDrawerCheck:checked + #rightDrawerContents + #rightDrawerPull:after {
	content: "\2039";
}
</style>
