<template>
  <div id="drawersContainer">
    <div id="rightDrawer" class="drawer">
      <input id="rightDrawerCheck" type="checkbox" />
      <div id="rightDrawerContents" class="drawerContents">
        <div v-for="action in actions" :key="action._id" class="drawer_item">
          <div class="stack">
            <div class="actionLine">
              <!-- TODO: Add origin player avatar here when added to API -->
              <!-- <img
                class="playerAvatar"
                :src="`/players/${player.icon}.png`"
                :alt="`${player.icon}.png`"
              />
              <label v-if="action.userId === user._id"
                ><small>(You)</small></label
              > -->
              <div class="actionType">
                <strong>{{ actionSentence(action.actionType) }}</strong
                ><br />
                <label
                  ><small>il y a {{ timeSince(action.date) }}</small></label
                >
              </div>
            </div>
          </div>
        </div>
      </div>
      <label
        id="rightDrawerPull"
        class="drawerPull"
        for="rightDrawerCheck"
      ></label>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: 'StatDrawerWidget',
  props: {
    actions: { type: Array },
  },
  methods: {
    /* eslint-disable */
    timeSince(rawDate) {
      let date = rawDate;

      if (typeof date !== "object") {
        date = new Date(date);
      }

      const seconds = Math.floor((new Date() - date) / 1000);
      let intervalType;

      let interval = Math.floor(seconds / 31536000);
      if (interval >= 1) {
        intervalType = "an";
      } else {
        interval = Math.floor(seconds / 2592000);
        if (interval >= 1) {
          intervalType = "mois";
          return (interval = ` ${intervalType}`);
        }
        interval = Math.floor(seconds / 86400);
        if (interval >= 1) {
          intervalType = "jour";
        } else {
          interval = Math.floor(seconds / 3600);
          if (interval >= 1) {
            intervalType = "heure";
          } else {
            interval = Math.floor(seconds / 60);
            if (interval >= 1) {
              intervalType = "minute";
            } else {
              interval = seconds;
              intervalType = "seconde";
            }
          }
        }
      }

      if (interval > 1 || interval === 0) {
        intervalType += "s";
      }

      return `${interval} ${intervalType}`;
    },
    /* eslint-enable */
    actionSentence(actionType) {
      switch (actionType) {
        case 'MOVE':
          return 'Déplacement';
        case 'POP':
          return 'Apparition';
        case 'NEXT_ROUND':
          return 'Round enregistré';
        case 'ATTACK':
          return 'Attaque';
        default:
          break;
      }
      return actionType;
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
};
</script>

<style scoped>
#drawersContainer {
  width: 50%;
  height: 50%;
  position: absolute;
  top: 20%;
  z-index: 997;
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

.drawer > input[type="checkbox"] {
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
  overflow: auto;
  padding: 10px;
  flex-direction: column-reverse;
  justify-content: flex-end;
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
  display: flex;
  text-align: center;
  border-radius: 7px;
  width: 200px;
  max-width: 150px;
  max-height: 100px;
  margin-left: 9px;
  margin-bottom: 15px;
  background-color: gray;
  box-shadow: 2px 0px 4px 2px darkgray;
  padding: 2px;
}

.actionLine {
  display: flex;
  flex-direction: row;
  margin-right: 10px;
}

.actionType {
  color: white;
  margin-top: 4px;
  padding: 2px;
  text-align: left;
  margin-left: 10px;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen,
    Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
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
