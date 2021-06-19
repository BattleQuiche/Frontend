<template>
    <div id="drawersContainer">
        <div id="leftDrawer" class="drawer">
            <input id="leftDrawerCheck" type="checkbox"/>
            <div id="leftDrawerContents" class="drawerContents">
                    <div v-for="key in players" :key="'player_'+key.playerIcon" class="drawer_item">
                        <div class="stack">
                        <div class="playerLine">
                            <player-case
                                class="playerAvatar"
                                :caseData='key.playerIcon'
                            />
                            <div class="playerName"><strong>{{ key.username }}</strong><label v-if="key.isCurrentPlayer"><small>(You)</small></label></div>
                        </div>
     
                   
                            <statistic-bar
                            :movementPoints='key.movementPoint'
                            :type="'health'"
                            />
                            <statistic-bar
                            :movementPoints='key.movementPoint'
                            :type="'movement'"
                            />

                        </div>
                    </div>    
            </div><label id="leftDrawerPull" class="drawerPull" for="leftDrawerCheck"></label>
        </div>
    </div>
</template>

<script>
import PlayerCase from '../PlayerGrid/PlayerCase.vue';
import StatisticBar from './StatisticBar.vue';

export default {
  name: "DrawerWidget",
  props: {
    players: {
      type: Array,
      required: true,
    }
  },
  components: {
    PlayerCase,
    StatisticBar,
  }
}
</script>

<style scoped>
#drawersContainer {
	width: 50%;
	height: 50%;
	position: absolute;
	top: 20%;
    z-index: 997;
	left: 0;
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
    border-radius: 0% 20px 20px 0%;
}

.drawerContents {
	position: fixed;
	top: 0;
	height: 100%;
    border-radius: 0% 20px 20px 0%;
}

.drawerPull {
	position: fixed;
	top: 50%;
    left: 0;

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
    margin-left: 60px;
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
    margin-left: 5px;
}

.playerName {
    color: white;
    margin-top:4px;
    margin-left: 10px;
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

#leftDrawer {
	left: -200px;
}
#leftDrawerContents {
    margin-top: 10%;
	left: -200px;
	width: 200px;
	background-color: lightGray;
	transition-property: left;
	transition-duration: 0.5s;
    transition-timing-function: linear;   
}
#leftDrawerPull {
	left: 0px;
	transition-property: left;
	transition-duration: 0.5s;
    transition-timing-function: linear;
}
#leftDrawerPull:after {
	content: "\203a";
    color: white;
}
#leftDrawerCheck:checked + #leftDrawerContents {
	left: 0px;
}
#leftDrawerCheck:checked + #leftDrawerContents + #leftDrawerPull {
	left: 200px;
}
#leftDrawerCheck:checked + #leftDrawerContents + #leftDrawerPull:after {
	content: "\2039";
}
</style>
