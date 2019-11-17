<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-row justify="center" :style="{width: '100%'}">
      <v-col
        sm="10"
        md="8"
        lg="6"
      >
        <HeadingDatePicker :class="$style.currentDate" />
        <ContentEditable
          :content="content"
        />
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
import ContentEditable from '~/components/ContentEditable'
import HeadingDatePicker from '~/components/HeadingDatePicker'

export default {
  components: {
    ContentEditable,
    HeadingDatePicker
  },

  transition (to, from) {
    if (!from) {
      return 'slide-left'
    }
    return +to.params.id < +from.params.id ? 'slide-right' : 'slide-left'
  },

  computed: {

  }
}
</script>

<style module>
.currentDate {
  font-size: 90px;
}
</style>
