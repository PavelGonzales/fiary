<template>
  <div>
    <p :style="{'font-size': '24px'}">
      К сожалению мы пока не поддерживаем оффлайн режим. Поэтому рекомендуем авторизоваться.
    </p>
    <v-btn outlined class="mt-5" @click="openAuthModal">
      Войти в аккаунт
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    openAuthModal () {
      this.$store.dispatch('modal/auth/TOGGLE', true)
    }
  }
}
</script>
