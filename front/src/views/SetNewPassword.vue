<template>
  <div>
    <Header />
    <div class="form-container">
      <form @submit.prevent="submitForm">
        <h1>Создайте новый пароль</h1>
        <!-- Password -->
        <input
          v-model.trim="formData.password"
          @blur="$v.formData.password.$touch()"
          type="password"
          ref="password"
          placeholder="Ваш пароль"
        />
        <div v-if="$v.formData.password.$error" class="form-error">
          <span v-if="!$v.formData.password.required" class="is-danger">Поле Пароль обязательно к заполнению
          </span>
          <span
            v-if="!$v.formData.password.minLength"
            class="is-danger">Минимальная длина пароля - 6 символов
          </span>
        </div>
        <div class="error-message">
          {{this.errors.password}}
        </div>
        <!-- Password2 -->
        <input
          v-model.trim="formData.password2"
          @blur="$v.formData.password2.$touch()"
          type="password"
          placeholder="Подтверждение пароля"
          ref="password2"
          autocomplete="off"
        />
        <div
          v-if="$v.formData.password2.$error"
          class="form-error">
          <span
            v-if="!$v.formData.password2.required"
            class="is-danger">Поле Подтверждение пароля обязательно к заполнению</span>
          <span
            v-if="!$v.formData.password2.sameAs"
            class="is-danger">Пароли не совпадают</span>
        </div>
        <div class="error-message">
          {{this.errors.password2}}
        </div>
        <button
          type="submit"
          :disabled="$v.formData.$invalid">
          Сменить пароль
        </button>
      </form>
    </div>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from "vuex";
import { email, required, minLength, sameAs } from 'vuelidate/lib/validators';

import Header from '@/components/Header.vue';

export default {
  name: 'Register',
  data() {
    return {
      formData: {
        password: '',
        password2: '',
        hash: this.$route.params.hash
      },
    }
  },
  validations: {
    formData: {
      password: {
        required,
        minLength: minLength(6)
      },
      password2: {
        required,
        minLength: minLength(6),
        sameAs: sameAs('password')
      }
    }
  },
  computed: {
    ...mapState('errors', ['errors']),
  },
  methods: {
    submitForm() {
      this.$store.dispatch('auth/setNewPassword', this.formData)
      .then(() => this.$router.push({ name: 'main' }))
        .catch((error) => {console.log(error)});
      
      this.$emit('closeLoginModal');
    },
  },
  components: {
    Header
  }
};
</script>

<style scoped>
button {
  border-radius: 1.2rem;
  border: 1px solid #b1b1b1;
  background: #b1b1b1;
  color: #fff;
  font-size: 0.7rem;
  font-weight: bold;
  padding: 0.7rem 1.5rem;
  letter-spacing: 1px;
  text-transform: uppercase;
  transition: transform 80ms ease-in;
  margin-top: 0.6rem;
}

button:active {
  transform: scale(0.95);
}

button:focus {
  outline: none;
}

button.ghost {
  background: transparent;
  border-color: #fff;
}

h1, h2, h3, h4 {
  line-height: 1.3;
}

p {
  font-size: 1rem;
  font-weight: 100;
  line-height: 1.5rem;
  letter-spacing: 0.5px;
  margin: 1.2rem 0 1.8rem;
}

a {
  text-decoration: none;
  margin: 0.6rem 0 0.2rem 0;
  font-size: 1rem;
}

.form-container {
  min-height: 300px;
  margin: 5% auto;
  padding: 20px;
  max-width: 600px;
}

.form-container form {
  background: #fff;
  display: flex;
  flex-direction: column;
  padding: 0 1.5rem;
  height: 100%;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.form-container input {
  background: #eee;
  border: none;
  padding: 0.7rem 0.9rem;
  margin: 0.5rem 0;
  width: 100%;
  border-radius: 0.5rem;
}

.form-container input:focus {
  outline: none;
}

.is-danger {
  color: red;
  font-size: 1rem;
}

.error-message{
  font-size: 1rem;
}
</style>