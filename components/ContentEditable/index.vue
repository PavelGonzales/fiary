
<template>
  <div>
    <div
      ref="content"
      :class="$style.content"
      :contenteditable="contenteditable"
      v-html="localContent"
    />
    <div :class="$style.buttons">
      <button
        v-for="button in actions"
        :key="button.title"
        :class="[$style.button, {[$style.active]: activeButtons.includes(button.title)}]"
        @click="handleButton(button.handler)"
        v-html="button.icon"
      />
    </div>
  </div>
</template>

<script>
/* eslint-disable import/no-named-default */
import { default as actions, exec } from './panel_actions'

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
      localContent: '<p></p>',
      actions,
      activeButtons: []
    }
  },

  computed: {
    buttonStates () {
      return Object.values(actions).filter(item => item.state)
    }
  },

  watch: {
    content (newVal) {
      this.localContent = this.content || ''
    }
  },

  created () {
    this.localContent = this.content || ''
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
      if (firstChild && firstChild.nodeType === 3) {
        exec('formatBlock', '<p>')
      } else if (this.$refs.content.innerHTML === '<p><br></p>') {
        this.$refs.content.innerHTML = '<p></p>'
      }
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
  bottom: 0;
  width: 100%;
  box-shadow: var(--custom-shadow);
  border-radius: 10px;
  background-color: #fff;
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
  color: #E3F2FD;
  line-height: 1;
  transition: opacity .2s ease-in-out;
  opacity: 0;
}

.content:empty::before {
  opacity: 1;
}

.content > img {
  max-width: 100%;
}
</style>
