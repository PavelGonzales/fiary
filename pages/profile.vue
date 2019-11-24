<template>
  <v-layout
    justify-center
  >
    <v-row justify="center" :style="{'font-size': '24px'}">
      <v-col
        xs="12"
        sm="10"
        md="8"
        lg="6"
      >
        <template v-if="isLoggedIn">
          <v-row align="center" justify="center" justify-sm="start">
            <v-avatar
              size="200"
              class="ml-3 mr-2"
            >
              <img
                v-if="user.avatar"
                :src="user.avatar"
                :alt="`${user.name} ${user.surname}`"
              >
              <span v-else-if="user.sign" :class="$style.userSign">{{ userSign }}</span>
              <v-icon v-else :class="$style.iconAvatar">
                mdi-account-circle
              </v-icon>
            </v-avatar>
            <v-col cols="12" sm="auto" :class="['text-center', 'text-sm-left', $style.userInfo]">
              <div>{{ user.username }}</div>
              <v-btn outlined class="mt-5" @click="logout">
                Выйти из аккаунта
              </v-btn>
            </v-col>
          </v-row>
        </template>
        <template v-else>
          <div>
            Вы не авторизовались.
          </div>
          <div>
            Весь ваш прогрес будет сохраняться локально.
          </div>
          <div>
            Если вы хотите иметь доступ к записям с любого устройства, пожалуйста авторизируйтесь.
          </div>
          <v-btn outlined class="mt-5" @click="openAuthModal">
            Войти в аккаунт
          </v-btn>
        </template>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import _get from 'lodash/get'
import { mapState } from 'vuex'

export default {
  middleware: 'auth',

  transition: 'slide-left',

  computed: {
    ...mapState({
      user: ({ user }) => user,
      isLoggedIn: ({ auth }) => auth.isLoggedIn
    }),

    userSign () {
      return `${_get(this, 'user.name[0]') || ''}.${_get(this, 'user.surname[0]') || ''}.`
    },

    userName () {
      return `${_get(this, 'user.name')} ${_get(this, 'user.surname')}`
    }
  },

  methods: {
    openAuthModal () {
      this.$store.dispatch('modal/auth/TOGGLE', true)
    },

    logout () {
      this.$store.dispatch('LOGOUT')
    }
  }
}
</script>

<style module>
.iconAvatar {
  font-size: 200px !important;
}

.userSign {
  font-size: 100px;
  border-radius: 50%;
  background-color: #f5f5f5;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
