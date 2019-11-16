<template>
  <v-layout
    column
    justify-center
    align-center
  >
    main page
    <v-btn nuxt to="2019-10-27">
      go to test article
    </v-btn>
  </v-layout>
</template>

<script>
export default {
  transition: 'slide-left'
}
</script>
