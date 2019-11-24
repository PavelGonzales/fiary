<template>
  <v-layout
    column
    justify-center
    align-center
  >
    <v-row justify="center" :style="{'font-size': '24px'}">
      <v-col
        cols="12"
        sm="10"
        md="8"
        lg="6"
      >
        <p>
          Привет!<br>
          Меня зовут Паша.<br>
          Я развиваю этот проект в одиночку. Если у тебя есть желание помочь мне финансово или помочь в разработке, то милости прошу в <a href="tg://resolve?domain=pavelgonzales" target="_blank">telegram</a> или <a href="https://www.facebook.com/develop.gonzales" target="_blank">facebook</a>.
        </p>
      </v-col>
    </v-row>
  </v-layout>
</template>

<script>
export default {
  transition: 'slide-left'
}
</script>
