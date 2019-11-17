
<template>
  <div>
    <div :class="$style.buttons">
      <button
        v-for="button in actions"
        :key="button.title"
        :class="[$style.button, {[$style.active]: activeButtons.includes(button.title)}]"
        @click="handleButton(button.handler)"
        v-html="button.icon"
      />
      <v-spacer />
      <v-menu
        offset-y
        left
        origin="top right"
        transition="scale-transition"
      >
        <template v-slot:activator="{ on }">
          <v-avatar
            size="26"
            tile
            class="mr-2"
            v-on="on"
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
    <div
      ref="content"
      :class="$style.content"
      :contenteditable="contenteditable"
      v-html="localContent"
    />
  </div>
</template>

<script>
/* eslint-disable import/no-named-default */
import { default as actions, exec } from './panel_actions'

export default {
  props: {
    value: {
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
      localContent: '<p></p>',
      actions,
      activeButtons: [],
      user: {
        avatar: 'https://scontent-arn2-2.xx.fbcdn.net/v/t1.0-9/75231871_1139264909603819_3068452561863311360_n.jpg?_nc_cat=101&_nc_oc=AQmrFJ1URGykhYneDShWd8Ja67nRLZRm1oU9A6vcq-tzJ5b6hTxsYuwf60cof_tZ7Io&_nc_ht=scontent-arn2-2.xx&oh=0795d2d2dde7db665f6ce9b4a83e4f5f&oe=5E8700A6',
        name: 'Pavel',
        surname: 'Gonzales',
        sign: 'PG'
      }
    }
  },

  computed: {
    buttonStates () {
      return Object.values(actions).filter(item => item.state)
    }
  },

  created () {
    this.localContent = this.value || ''
  },

  mounted () {
    this.$refs.content && this.$refs.content.addEventListener('mouseup', this.handleContent)
    this.$refs.content && this.$refs.content.addEventListener('keyup', this.handleContent)
    this.$refs.content && this.$refs.content.addEventListener('input', this.handleInput)
  },

  destroyed () {
    this.$refs.content && this.$refs.content.removeEventListener('mouseup', this.handleContent)
    this.$refs.content && this.$refs.content.removeEventListener('keyup', this.handleContent)
    this.$refs.content && this.$refs.content.removeEventListener('input', this.handleInput)
  },

  methods: {
    handleContent () {
      this.activeButtons = this.buttonStates
        .filter(item => item.state())
        .map(item => item.title)
    },
    handleInput ({ target: { firstChild } }) {
      let contentInnerHTML = this.$refs.content.innerHTML

      if (firstChild && firstChild.nodeType === 3) {
        exec('formatBlock', '<p>')
      } else if (contentInnerHTML === '<p><br></p>') {
        contentInnerHTML = '<p></p>'
      }
      this.$emit('input', contentInnerHTML)
    },
    handleButton (handler) {
      handler()
      this.handleContent()
      this.$refs.content.focus()
    }
  }
}
</script>
<style module>
.buttons {
  position: sticky;
  top: 12px;
  width: 100%;
  box-shadow: var(--custom-shadow);
  border-radius: 10px;
  background-color: #fff;
  margin-bottom: 16px;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

.button {
  margin: 4px;
  padding: 4px;
  height: 32px;
  width: 32px;
  transition: transform .15s ease-in;
}

.button:hover {
  transform: scale(1.1);
}

.button.active {
  color: royalblue;
}

.content {
  min-height: 200px;
  outline: none;
  border-radius: 10px;
  transition: box-shadow .2s ease-in-out;
  font-size: 26px;
}

.content::before {
  content: 'Как прошел день?';
  display: block;
  position: absolute;
  font-size: 42px;
  color: var(--placeholder-gray);;
  line-height: 1;
  transition: opacity .2s ease-in-out;
  opacity: 0;
}

.content:empty::before {
  opacity: 1;
}

.content img {
  max-width: 100%;
}

.content h1 {
  line-height: 1.1;
}

@media (max-width: 599px) {
  .content h1 {
    font-size: 36px;
  }
}
</style>
