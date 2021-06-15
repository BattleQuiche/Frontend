<template>
  <div class="menu wrapper">
    <div id="setUsername" v-bind:class="{'modal--shown' : modalIsOpen}" class="modal" >
      <div class="modal-content">
        <p class="modal__title">Indiquer votre nom de joueur</p>
        <hr>
        <form class="modal__formToInvite">
          <input class="modal__username--input" v-model="username" type="text" placeholder="Saisissez votre pseudo :">
          <button class="modal__submit" @click="setupUsername" type="submit">C'est parti !</button>
        </form>
      </div>
    </div>
   <div class="menu__container">
     <main>
       <h1>Battle Quiche</h1>
       <h3 v-if="!!user">Bonjour {{user.username}} !</h3>
     </main>
     <aside>
       <button @click="createParty">Créer une partie</button>
      <router-link :to="{ name: 'CreateParty' }">Créer une partie</router-link>
      <router-link :to="{ name: 'JoinPartyStep1' }">Rejoindre une partie</router-link>
     </aside>
   </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
let URL = 'https://wars.quiches.ovh/api'
export default {
  name: 'Menu',
  data() {
    return {
      modalIsOpen: false,
      username: '',
    }
  },
  mounted() {
    this.modalIsOpen = !this.user
  },
  methods: {
    ...mapActions(['setUser']),
    async setupUsername(e) {
      e.preventDefault();

      try {
        const URL_USR = `${URL}/user`
        const result = await this.$http.put(URL_USR, {username : this.username})
        this.setUser(result.data)

      } catch (err) {
        console.log(err)
      }
    },
    async createParty (e) {
      e.preventDefault();

      try {
        const URL_PARTY = `${URL}/party`
        const result = await this.$http.put(URL_PARTY)
        await this.$router.push({name: 'CreateParty', params: {partyId: result.data.partyId}})
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {
    ...mapGetters(['user'])
  },
  watch: {
    user(newUser) {
      this.modalIsOpen = (newUser === null)
    }
  }
}
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
    background-color: rgba(0,0,0,0);
    pointer-events: none;
    cursor: none;
    transition: background-color 1s;
  }

  .modal--shown {
    pointer-events: auto;
    cursor: pointer;
    background-color: rgba(0,0,0,0.4);
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
