<template>
  <div class="form-container">
    <form @submit.prevent="submitForm">
      <h1>Вход</h1>
      <input
        v-model.trim="formData.email"
        @blur="$v.formData.email.$touch()"
        type="email"
        placeholder="Ваш Email"
        ref="email"
      />
      <div v-if="$v.formData.email.$error" class="form-error">
        <span v-if="!$v.formData.email.required" class="is-danger">Поле email обязательно к заполнению</span>
        <span v-if="!$v.formData.email.email" class="is-danger">Email не корректный</span>
      </div>
      <div class="error-message">
        {{this.errors.userNotFound}}
      </div>
      <input
        v-model.trim="formData.password"
        @blur="$v.formData.password.$touch()"
        type="password"
        ref="password"
        placeholder="Ваш пароль"
        outlined
        autocomplete="current-password"
      />
      <div v-if="$v.formData.password.$error" class="form-error">
        <span v-if="!$v.formData.password.required" class="help is-danger">Поле Пароль обязательно к заполнению</span>
        <span
          v-if="!$v.formData.password.minLength"
          class="is-danger">Минимальная длина пароля - 6 символов
        </span>
      </div>
      <div class="error-message">
        {{this.errors.password}}
      </div>
      <div class="error-message">
        {{this.errors.hashNotActive}}
      </div>
      <span @click.prevent="showResetPasswordModal">
        Забыли пароль?
      </span>
      <button
        type="submit"
        :disabled="$v.formData.$invalid">
        Войти
      </button>
    </form>
    <modal
      name="ModalResetPassword"
      height="auto"
    >
      <ResetPassword
        @closeResetPasswordModal="hideResetPasswordModal"/>
    </modal>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from "vuex";
import { email, required, minLength, sameAs } from 'vuelidate/lib/validators';

import ResetPassword from '@/views/ResetPassword';

export default {
  name: 'Login',
  data() {
    return {
      formData: {
        email: '',
        password: '',
      }
    }
  },
  validations: {
    formData: {
      email: {
        email,
        required
      },
      password: {
        required,
        minLength: minLength(6)
      }
    },
  },
  computed: {
    ...mapState('errors', ['errors']),
  },
  methods: {
    submitForm() {
      this.$store.dispatch('auth/login', this.formData)
        .then(() => this.$router.push({ name: 'main' }))
        .catch((error) => {console.log(error)});

      this.$emit('closeLoginModal');
    },
    showResetPasswordModal() {
      this.$modal.show('ModalResetPassword');
    },
    hideResetPasswordModal() {
      this.$modal.hide('ModalResetPassword');
    },
  },
  components: {
    ResetPassword
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

span {
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
