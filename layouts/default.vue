<template>
  <v-app :style="{'background-color': '#fff'}">
    <v-content>
      <v-container class="fill-height">
        <v-row justify="center">
          <v-col
            xs="12"
            sm="10"
            md="8"
          >
            <Header />
          </v-col>
        </v-row>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Header from '~/components/Header'

export default {
  components: {
    Header
  },

  data () {
    return {

    }
  }
}
</script>
