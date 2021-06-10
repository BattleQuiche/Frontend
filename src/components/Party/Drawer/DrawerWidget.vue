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

<style scoped>

#drawersContainer {
	width: 50%;
	height: 50%;
	position: absolute;
	top: 20%;
    z-index: 1000;
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
	width: 25px;
	background: DarkGray;
	text-align: center;
	font-weight: bold;
	font-size: 1.2em;
	vertical-align: top;
    padding: 70px 0;
}
.drawerContents {
	position: absolute;
	top: 0;
	height: 100%;
}
.drawerPull {
	position: absolute;
	top: 50%;

}
.drawerPull:after {
	content: "";
}

#leftDrawer {
	left: -200px;
}
#leftDrawerContents {
	left: 0;
	width: 200px;
	background-color: lightGray;
    border-radius: 5%;
	transition-property: left;
	transition-duration: 0.5s;
    transition-timing-function: linear;   
}
#leftDrawerPull {
	left: 200px;
	transition-property: left;
	transition-duration: 0.5s;
    transition-timing-function: linear;
}
#leftDrawerPull:after {
	content: "\203a";
}
#leftDrawerCheck:checked + #leftDrawerContents {
	left: 150px;
}
#leftDrawerCheck:checked + #leftDrawerContents + #leftDrawerPull {
	left: 350px;
}
#leftDrawerCheck:checked + #leftDrawerContents + #leftDrawerPull:after {
	content: "\2039";
}
</style>
