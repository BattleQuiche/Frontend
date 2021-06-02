<template>
  <div class="players">
    <div class="players__list">
      <p>Joueur 1</p>
      <p>Joueur 2</p>
    </div>
    <p class="players__vs">VS</p>
    <div class="players__list">
      <p>Joueur 3</p>
      <p v-if="players.length === 4">Joueur 4</p>
      <button v-else @click="showModal"  @keydown.esc="hideModal">+</button>
    </div>
    <div id="addPlayerModal" v-bind:class="{'modal--shown' : modalIsOpen}" class="modal" >
      <div class="modal-content">
        <span @click="hideModal" class="close">&times;</span>
        <p class="modal__title">Inviter un nouveau joueur</p>
        <hr>
        <form class="modal__formToInvite">
          <input class="modal__mail--input" type="text" placeholder="Nom ou adresse mail">
          <input class="modal__mail--input" type="text" placeholder="Nom ou adresse mail">
          <input class="modal__mail--input" type="text" placeholder="Nom ou adresse mail">
          <button class="modal__submit" type="submit">Envoyer les invitations</button>
        </form>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'PlayersList',
  data() {
    return {
      modalIsOpen: false,
      players: [],
    }
  },
  methods: {
    showModal () {
     this.modalIsOpen = true;
    },
    hideModal () {
      this.modalIsOpen = false
    },
  },
  mounted() {
    window.addEventListener("click", (event) => {
      const modal = document.getElementById("addPlayerModal");
      if (event.target === modal) {
        this.hideModal()
      }
    });
  }
}
</script>

<style scoped>
.players {
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
}

.players__list {
  display: flex;
}

.players__list p {
  margin: 0 25px;
  flex: 1;
  text-align: center;
}

.players__list button {
  margin: 0 40px;
  flex: 1;
  border-radius: 100%;
  text-align: center;
  border: 1px solid dimgrey;
}

.players .players__vs {
  font-size: 70px;
  margin: 10px 50px;
  text-align: center;
}

.players p:nth-of-type(3) {
  text-align: right;
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
  transform: translateY(100vw);
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

.modal__mail--input {
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
