<template>
  <label for="theme" :class="[$style.label, {[$style.dark]: isDarkTheme}]">
    <input
      id="theme"
      type="checkbox"
      name="theme"
      :value="isDarkTheme"
      :class="$style.input"
      @change="change"
    >
    <v-icon :class="$style.icon">mdi-weather-night</v-icon>
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
  background-color: #303030;
  border-radius: 0 0 50% 50%;
}

.label.dark {
  background-color: #fafafa;
}

.icon {
  color: #fafafa!important;
}

.dark .icon {
  color: #303030!important;
}

.input {
  display: none;
}
</style>
