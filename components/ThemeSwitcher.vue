<template>
  <label for="theme" :class="$style.label">
    <input
      id="theme"
      type="checkbox"
      name="theme"
      :value="isDarkTheme"
      :class="$style.input"
      @change="change"
    >
    <v-icon>mdi-weather-night</v-icon>
  </label>
</template>

<script>
import { mapState } from 'vuex'
export default {
  computed: {
    ...mapState({
      isDarkTheme: ({ theme }) => theme.dark
    })
  },

  methods: {
    change () {
      this.$store.dispatch('SWITCH_THEME', !this.isDarkTheme)
    }
  }
}
</script>

<style module>
.label {
  cursor: pointer;
  padding: 4px;
}

.input {
  display: none;
}
</style>
