<template>
  <nav class="navbar">
    <div class="container">
      <h1>
        <router-link
          to="/">
          F1blog
        </router-link>
      </h1>
      <div class="nav">
        <div v-if="isAuthenticated">
          <!-- <router-link
            v-if="this.profile.handle"
            class="padding"
            :to="{ name: 'profiles' }">
            <span>
              Users
            </span>
          </router-link> -->
          <a @click="logout">
            <span class="padding">Logout</span>
          </a>
        </div>
        <div v-else>
          <span @click.prevent="showLoginModal">Login</span>
          <span @click.prevent="showRegisterModal">Register</span>
        </div>
      </div>
    </div>
    <modal
      name="ModalLogin"
      height="auto"
    >
      <Login
        @closeLoginModal="hideLoginModal"/>
    </modal>
    <modal
      name="ModalRegister"
      height="auto"
    >
      <Register
        @closeRegisterModal="hideRegisterModal"/>
    </modal>
  </nav>
</template>

<script>
import { mapState } from "vuex";

import Login from '@/views/Login';
import Register from '@/views/Register';

export default {
  computed: {
    ...mapState('auth', ['isAuthenticated', 'user']),
  },
  methods: {
    logout() {
      this.$store.dispatch('auth/logout', this.formRegisterData)
        .catch((error) => {console.log(error)});
    },
    showLoginModal() {
      this.$modal.show('ModalLogin');
    },
    hideLoginModal() {
      this.$modal.hide('ModalLogin');
    },
    showRegisterModal() {
      this.$modal.show('ModalRegister');
    },
    hideRegisterModal() {
      this.$modal.hide('ModalRegister');
    }
  },
  components: {
    Login,
    Register
  }
}
</script>

<style scoped>
.navbar {
  background-color: rgb(252, 252, 252);
  height: 50px;
  font-size: 1.2rem;
  padding: 0.3rem 0 0.3rem 0;
  border-bottom: 1px solid rgba(219,219,219,1);
}

.navbar .container {
  display: grid;
  grid-template-columns: 1fr 4fr;
  grid-gap: 1rem;
}

.navbar .nav {
  justify-self: flex-end;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>