<template>
  <div class="form-container">
    <form @submit.prevent="submitRegisterForm">
      <h1>Регистрация</h1>
      <!-- Name -->
      <input
        v-model="formRegisterData.name"
        @blur="$v.formRegisterData.name.$touch()"
        type="text"
        placeholder="Ваше имя"
        ref="name"
      />
      <div
        v-if="$v.formRegisterData.name.$error"
        class="form-error">
        <span
          v-if="!$v.formRegisterData.name.required"
          class="is-danger">
          Поле Имя обязательно к заполнению
        </span>
        <span
          v-if="!$v.formRegisterData.name.minLength"
          class="is-danger">
          Минимальная длина имени - 6 символов
        </span>
      </div>
      <div class="error-message">
        {{this.errors.name}}
      </div>
      <!-- E-mail -->
      <input
        v-model.trim="formRegisterData.email"
        @blur="$v.formRegisterData.email.$touch()"
        type="email"
        placeholder="Ваш Email"
        id="email"
        ref="email"
        />
      <div v-if="$v.formRegisterData.email.$error" class="form-error">
        <span v-if="!$v.formRegisterData.email.required" class="is-danger">Поле Email обязательно к заполнению</span>
        <span v-if="!$v.formRegisterData.email.email" class="is-danger">Email не корректный</span>
      </div>
      <div class="error-message">
        {{this.errors.email}}
      </div>
      <!-- Password -->
      <input
        v-model.trim="formRegisterData.password"
        @blur="$v.formRegisterData.password.$touch()"
        type="password"
        ref="password"
        placeholder="Ваш пароль"
      />
      <div v-if="$v.formRegisterData.password.$error" class="form-error">
        <span v-if="!$v.formRegisterData.password.required" class="is-danger">Поле Пароль обязательно к заполнению
        </span>
        <span
          v-if="!$v.formRegisterData.password.minLength"
          class="is-danger">Минимальная длина пароля - 6 символов
        </span>
      </div>
      <div class="error-message">
        {{this.errors.password}}
      </div>
      <!-- Password2 -->
      <input
        v-model.trim="formRegisterData.password2"
        @blur="$v.formRegisterData.password2.$touch()"
        type="password"
        placeholder="Подтверждение пароля"
        ref="password2"
        autocomplete="off"
      />
      <div
        v-if="$v.formRegisterData.password2.$error"
        class="form-error">
        <span
          v-if="!$v.formRegisterData.password2.required"
          class="is-danger">Поле Подтверждение пароля обязательно к заполнению</span>
        <span
          v-if="!$v.formRegisterData.password2.sameAs"
          class="is-danger">Пароли не совпадают</span>
      </div>
      <div class="error-message">
        {{this.errors.password2}}
      </div>
      <button
        type="submit"
        :disabled="$v.formRegisterData.$invalid">
        Зарегистрироваться
      </button>
    </form>
  </div>
</template>

<script>
import Vue from 'vue';
import { mapState } from "vuex";
import { email, required, minLength, sameAs } from 'vuelidate/lib/validators';

export default {
  name: 'Register',
  data() {
    return {
      formRegisterData: {
        email: '',
        password: '',
        password2: '',
        name: '',
      },
    }
  },
  validations: {
    formRegisterData: {
      name: {
        required,
        minLength: minLength(6)
      },
      email: {
        email,
        required,
        minLength: minLength(6)
      },
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
    submitRegisterForm() {
      this.$store.dispatch('auth/register', this.formRegisterData)
        .catch((error) => {console.log(error)});
      
      this.$emit('closeLoginModal');
    },
  },
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