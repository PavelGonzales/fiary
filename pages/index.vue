<template>
  <v-row
    justify="center"
    align="center"
  >
    <v-col
      sm="5"
      lg="4"
      cols="12"
    >
      <div :class="$style.title">
        Fiary
      </div>
      <v-btn
        v-for="item in listMenu"
        :key="item.link"
        nuxt
        block
        :to="item.link"
        class="mb-3"
      >
        {{ item.text }}
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
export default {
  transition: 'slide-left',

  data () {
    return {
      listMenu: [
        {
          text: 'Создать запись',
          link: new Date().toISOString().substr(0, 10)
        },
        {
          text: 'Список записей',
          link: '/list'
        },
        {
          text: 'Профиль',
          link: '/profile'
        },
        {
          text: 'О проекте',
          link: '/about'
        },
        {
          text: 'Помощь',
          link: '/help'
        }
      ]
    }
  }
}
</script>

<style module>
.title {
  font-size: 150px;
  text-align: center;
  color: #ccc;
  margin-top: -120px;
}
</style>
