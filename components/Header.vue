
<template>
  <div
    :class="$style.root"
    class="pa-2"
  >
    <v-avatar
      size="40"
      tile
      :class="$style.avatar"
      class="mr-2"
    >
      <img
        v-if="user.avatar"
        :src="user.avatar"
        :alt="`${user.name} ${user.surname}`"
      >
      <span v-else class="white--text headline">
        {{ user.sign }}
      </span>
    </v-avatar>

    <span :class="$style.name">
      {{ user.name }} {{ user.surname }}
    </span>

    <v-menu
      offset-y
      left
      origin="top right"
      transition="scale-transition"
    >
      <template v-slot:activator="{ on }">
        <v-btn text :class="$style.menuBtn" v-on="on">
          <v-icon>mdi-menu</v-icon>
        </v-btn>
      </template>

      <v-list>
        <v-list-item nuxt to="/">
          <v-list-item-title>Главная</v-list-item-title>
        </v-list-item>
        <v-list-item nuxt to="/settings">
          <v-list-item-title>Найстройки</v-list-item-title>
        </v-list-item>
        <v-list-item nuxt to="/list">
          <v-list-item-title>Список записей</v-list-item-title>
        </v-list-item>
        <v-list-item nuxt to="/about">
          <v-list-item-title>О проекте</v-list-item-title>
        </v-list-item>
        <v-list-item nuxt to="/help">
          <v-list-item-title>Помощь</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  props: {
    content: {
      type: String,
      default: ''
    },
    contenteditable: {
      type: Boolean,
      default: true
    }
  },

  data () {
    return {
      user: {
        avatar: 'https://cdn.vuetifyjs.com/images/john.jpg',
        name: 'Pavel',
        surname: 'Gonzales',
        sign: 'PG'
      }
    }
  },

  computed: {

  },

  mounted () {
  },

  destroyed () {
  },

  methods: {

  }
}
</script>
<style module>
.root {
  position: sticky;
  top: 0;
  width: 100%;
  box-shadow: var(--custom-shadow);
  border-radius: 10px;
  background-color: #fff;
  display: flex;
  align-items: center;
}

.avatar {
  border-radius: 10px;
}

.name {
  font-size: 20px;
  font-weight: bold;
}

.menuBtn {
  margin-left: auto;
}
</style>
