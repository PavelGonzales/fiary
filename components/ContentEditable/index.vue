
<template>
  <div :class="{[$style.dark]: isDarkTheme}">
    <div :class="$style.buttons">
      <div :class="$style.buttonsWrap">
        <button
          v-for="button in actions"
          :key="button.title"
          :class="[$style.button, {[$style.active]: activeButtons.includes(button.title)}]"
          @click="handleButton(button.handler)"
          v-html="button.icon"
        />
        <input
          id="file"
          type="file"
          name="file"
          accept="image/*"
          :class="$style.fileInput"
          @change="uploadImage"
        >
        <label for="file" :class="$style.button">
          <svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
          </svg>
        </label>
      </div>

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
            <v-icon v-else>
              mdi-account-circle
            </v-icon>
          </v-avatar>
        </template>

        <v-list>
          <v-list-item nuxt to="/">
            <v-list-item-title>Главная</v-list-item-title>
          </v-list-item>
          <v-list-item nuxt to="/profile">
            <v-list-item-title>Профиль</v-list-item-title>
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
import { mapState } from 'vuex'
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
      activeButtons: []
    }
  },

  computed: {
    ...mapState({
      user: ({ user }) => user,
      isLoggedIn: ({ auth }) => auth.isLoggedIn,
      isDarkTheme: ({ theme }) => theme.dark
    }),
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
    },
    async uploadImage (event) {
      const files = event.target.files
      const formData = new FormData()
      formData.append('image', files[0], files[0].filename)

      const image = await this.$store.dispatch('articles/FILE_UPLOAD', formData)

      if (image.path) {
        this.$refs.content.focus()
        exec('insertImage', image.path)
      }
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

.dark .buttons {
  background-color: #424242;
}

.buttonsWrap {
  display: flex;
}

@media (max-width: 599px) {
  .buttons {
    position: fixed;
    bottom: 0;
    top: auto;
    left: 0;
    margin-bottom: 0;
  }
}

.button {
  margin: 4px;
  padding: 4px;
  height: 32px;
  width: 32px;
  transition: transform .15s ease-in;
  box-sizing: border-box;
  cursor: pointer;
}

.button:hover {
  transform: scale(1.1);
}

.button.active {
  color: royalblue;
}

.fileInput {
  width: 0.1px;
  height: 0.1px;
  opacity: 0;
  overflow: hidden;
  position: absolute;
  z-index: -1;
}

.fileInput:focus + .button {
  outline: 1px dotted #000;
  outline: -webkit-focus-ring-color auto 5px;
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
  color: var(--placeholder-gray);
  line-height: 1;
  transition: opacity .2s ease-in-out;
  opacity: 0;
}

.dark .content::before {
  color: var(--placeholder-gray-dark)
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
