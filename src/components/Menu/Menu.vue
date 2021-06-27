<template>
  <div class="menu wrapper">
    <div
      id="setUsername"
      class="modal"
      v-bind:class="{ 'modal--shown': modalIsOpen }"
    >
      <div class="modal-content">
        <p class="modal__title">Indiquer votre nom de joueur</p>
        <hr />
        <form class="modal__formToInvite">
          <input
            v-model="username"
            class="modal__username--input"
            placeholder="Saisissez votre pseudo :"
            type="text"
          />
          <button class="modal__submit" type="submit" @click="setupUsername">
            C'est parti !
          </button>
        </form>
      </div>
    </div>
    <!--    <div v-if="!permissionNotification" id="pushPermission">   -->
    <!--    <div id="pushPermission">-->
    <!--      <button v-on:click="askPermission">Recevoir les notifications</button>-->
    <!--    </div>-->

    <button @click="sendTestNotif">Send notif test</button>
    <div class="menu__container">
      <main>
        <span v-if="notificationAlertMsg">{{ notificationAlertMsg }}</span>
        <h1>Battle Quiche</h1>
        <h3 v-if="!!user">Bonjour {{ user.username }} !</h3>
      </main>
      <aside>
        <button @click="createParty">Créer une partie</button>
        <router-link :to="{ name: 'JoinPartyStep1' }"
          >Rejoindre une partie</router-link
        >
      </aside>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
  name: 'Menu',
  data() {
    return {
      modalIsOpen: false,
      username: '',
      notificationAlertMsg: undefined,
    };
  },
  mounted() {
    this.modalIsOpen = !this.user;
    if (this.user) {
      this.askPermission();
    }
  },
  methods: {
    ...mapActions(['setUser']),
    async setupUsername(e) {
      e.preventDefault();

      try {
        const URL_USR = `${this.$env.VUE_APP_API_BASE_URL}/user`;
        const result = await this.$http.put(URL_USR, {
          username: this.username,
        });
        this.setUser(result.data);
        await this.askPermission();
      } catch (err) {
        console.log(err);
      }
    },
    async askPermission() {
      if (!('Notification' in window) || !('serviceWorker' in navigator)) {
        return;
      }

      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        this.notificationAlertMsg = 'Attention vous ne receverez pas les notfications !';

        return;
      }

      await this.registerServiceWorker();
    },
    async registerServiceWorker() {
      const registration = await navigator.serviceWorker.register('/sw.js');

      let subscription = await registration.pushManager.getSubscription();

      await this.getPublicKey();

      // L'utilisateur n'est pas déjà abonné, on l'abonne au notification push
      if (!subscription) {
        subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: await this.getPublicKey(),
        });
      }

      await this.saveSubscription(subscription);
    },
    async getPublicKey() {
      const URL_PUBLIC_KEY = `${this.$env.VUE_APP_API_BASE_URL}/notification/public-key`;
      try {
        const { data: key } = await this.$http.get(URL_PUBLIC_KEY);
        return this.urlBase64ToUint8Array(key);
      } catch (e) {
        console.log(e);
        return e;
      }
    },
    async saveSubscription(subs) {
      const body = {
        ...subs.toJSON(),
        userId: this.user._id,
        title: 'Backend notification subscribe',
        body: "Ceci est un test de notification retournée pour signaler que l'utilisateur est bien enregistré au stream des notifs",
      };
      const URL_SAVE_SUBS = `${this.$env.VUE_APP_API_BASE_URL}/notification/save`;
      try {
        await this.$http.post(URL_SAVE_SUBS, body);
      } catch (e) {
        console.log(e);
      }
    },
    async sendTestNotif(e) {
      e.preventDefault();

      const { data: result } = await this.$http.post(
        `${this.$env.VUE_APP_API_BASE_URL}/notification/test-notif`,
        {
          userId: this.user._id,
          title: 'Backend notification test',
          body: "Ceci est un test de notification retournée pour signaler que l'utilisateur est bien enregistré au stream des notifs",
        },
      );

      console.log(
        `Test notif route for userId ${this.user._id} return: ${result}`,
      );
    },
    urlBase64ToUint8Array(base64String) {
      const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
      const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

      const rawData = window.atob(base64);
      const outputArray = new Uint8Array(rawData.length);

      for (let i = 0; i < rawData.length; i += 1) {
        outputArray[i] = rawData.charCodeAt(i);
      }
      return outputArray;
    },
    async createParty(e) {
      e.preventDefault();

      try {
        const URL_PARTY = `${this.$env.VUE_APP_API_BASE_URL}/party`;
        const result = await this.$http.put(URL_PARTY);
        await this.$router.push({
          name: 'CreateParty',
          params: { partyId: result.data.partyId },
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    ...mapGetters(['user']),
  },
  watch: {
    user(newUser) {
      this.modalIsOpen = newUser === null;
    },
  },
};
</script>

<style>
.menu {
  display: flex;
  flex-direction: column;
}

.menu__container {
  display: flex;
  flex: 1;
}

.menu__container #ios-back-button {
  width: 100vw;
}

.menu__container main,
.menu__container aside {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
  padding: 30px;
}

.menu__container a {
  margin: 20px 0;
  cursor: pointer;
}

.modal {
  display: block;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0);
  pointer-events: none;
  cursor: none;
  transition: background-color 1s;
}

.modal--shown {
  pointer-events: auto;
  cursor: pointer;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  border-radius: 30px;
  width: 40vw;
  transform: translateY(100vh);
  transition: transform 1s;
}

.modal--shown .modal-content {
  transform: translateX(0);
}

.modal-content .modal__title {
  font-size: 40px;
  margin: 0 10px;
  padding: 20px 0;
}

.modal-content .modal__formToInvite {
  display: flex;
  flex-direction: column;
}

.modal__username--input {
  margin: 15px 70px 15px 0;
}

.modal__submit {
  margin: 20px 180px;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
