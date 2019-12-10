
<template>
  <v-dialog
    :value="open"
    max-width="360"
    @click:outside="close"
  >
    <v-card>
      <v-tabs
        v-model="tab"
        background-color="transparent"
        color="basil"
        grow
      >
        <v-tab>
          Вход
        </v-tab>
        <v-tab>
          Регистрация
        </v-tab>
      </v-tabs>

      <v-tabs-items v-model="tab">
        <v-tab-item>
          <v-card-text>
            <v-text-field
              v-model="loginModel.email"
              label="Логин"
              outlined
              validate-on-blur
              :rules="[rules.email]"
            />
            <v-text-field
              v-model="loginModel.password"
              label="Пароль"
              outlined
              :append-icon="showLoginPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showLoginPassword ? 'text' : 'password'"
              @click:append="showLoginPassword = !showLoginPassword"
            />
            <v-btn
              outlined
              block
              color="indigo"
              @click="login"
            >
              Войти
            </v-btn>
            <div v-if="errorMessage" class="red--text text-center mt-3">
              {{ errorMessage }}
            </div>
          </v-card-text>
        </v-tab-item>
        <v-tab-item>
          <v-card-text>
            <v-text-field
              v-model="registrationModel.name"
              label="Имя"
              outlined
              :rules="[rules.required]"
            />

            <v-text-field
              v-model="registrationModel.surname"
              label="Фамилия"
              outlined
              :rules="[rules.required]"
            />

            <v-text-field
              v-model="registrationModel.email"
              label="E-mail"
              outlined
              :rules="[rules.email, rules.required]"
            />
            <v-text-field
              v-model="registrationModel.password"
              label="Пароль"
              outlined
              :append-icon="showRegistrationPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showRegistrationPassword ? 'text' : 'password'"
              @click:append="showRegistrationPassword = !showRegistrationPassword"
            />
            <v-text-field
              v-model="registrationModel.repeatPassword"
              label="Повторите пароль"
              outlined
              :append-icon="showRegistrationRepeatPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showRegistrationRepeatPassword ? 'text' : 'password'"
              @click:append="showRegistrationRepeatPassword = !showRegistrationRepeatPassword"
            />
            <v-checkbox
              v-model="registrationModel.agree"
              label="Я согласен с политикой обработки персональных данных"
              class="mt-0"
            />

            <v-btn
              outlined
              block
              color="indigo"
              @click="registration"
            >
              Зарегистрироваться
            </v-btn>
            <div v-if="errorMessageRegistration" class="red--text text-center mt-3">
              {{ errorMessageRegistration }}
            </div>
          </v-card-text>
        </v-tab-item>
      </v-tabs-items>
    </v-card>
  </v-dialog>
</template>

<script>
export default {

  components: {
  },
  props: {
    open: {
      type: Boolean,
      default: false
    }
  },

  data () {
    return {
      dialog: false,
      tab: null,
      errorMessage: undefined,
      errorMessageRegistration: undefined,
      showLoginPassword: false,
      showRegistrationPassword: false,
      showRegistrationRepeatPassword: false,
      loginModel: {
        email: 'develop.gonzales@gmail.com',
        password: 'qwerty'
      },
      registrationModel: {
        name: '',
        surname: '',
        email: '',
        password: '',
        repeatPassword: '',
        agree: false
      },
      rules: {
        required: value => !!value || 'Обязательное поле.',
        email: (value) => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Неверный e-mail.'
        }
      }
    }
  },

  methods: {
    close () {
      this.$store.dispatch('modal/auth/TOGGLE', false)
    },

    async login () {
      const data = await this.$store.dispatch('LOGIN', this.loginModel)

      this.errorMessage = data.error

      if (!data.error) {
        this.close()
      }
    },

    async registration () {
      const data = await this.$store.dispatch('REGISTRATION', this.registrationModel)

      this.errorMessageRegistration = data.error

      if (!data.error) {
        this.loginModel.email = this.registrationModel.email
        this.loginModel.password = this.registrationModel.password
        this.login()
      }
    }
  }
}
</script>
