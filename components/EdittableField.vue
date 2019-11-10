<template>
  <div id="pell" class="pell" />
</template>
<script>
import pell from 'pell'

export default {
  props: {
    contenteditable: {
      type: Boolean,
      default: false
    },
    placeholder: {
      type: String,
      default: ''
    },
    type: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      output: ''
    }
  },

  mounted () {
    pell.init({
      element: document.getElementById('pell'),
      defaultParagraphSeparator: 'p',
      onChange: (html) => {
        this.output = html
      },
      classes: {
        actionbar: 'pell-actionbar-custom-name',
        button: 'pell-button-custom-name',
        content: 'pell-content-custom-name',
        selected: 'pell-button-selected-custom-name'
      },
      actions: [
        {
          name: 'heading1',
          icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M14,18V16H16V6.31L13.5,7.75V5.44L16,4H18V16H20V18H14Z" />
          </svg>`
        },
        {
          name: 'heading2',
          icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M21,18H15A2,2 0 0,1 13,16C13,15.47 13.2,15 13.54,14.64L18.41,9.41C18.78,9.05 19,8.55 19,8A2,2 0 0,0 17,6A2,2 0 0,0 15,8H13A4,4 0 0,1 17,4A4,4 0 0,1 21,8C21,9.1 20.55,10.1 19.83,10.83L15,16H21V18Z" />
          </svg>`
        },
        {
          name: 'paragraph',
          icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M13,4A4,4 0 0,1 17,8A4,4 0 0,1 13,12H11V18H9V4H13M13,10A2,2 0 0,0 15,8A2,2 0 0,0 13,6H11V10H13Z" />
          </svg>`
        },
        {
          name: 'bold',
          icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z" />
          </svg>`
        },
        {
          name: 'italic',
          icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z" />
          </svg>`
        },
        {
          name: 'underline',
          icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M5,21H19V19H5V21M12,17A6,6 0 0,0 18,11V3H15.5V11A3.5,3.5 0 0,1 12,14.5A3.5,3.5 0 0,1 8.5,11V3H6V11A6,6 0 0,0 12,17Z" />
          </svg>`
        },
        {
          name: 'quote',
          icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M14,17H17L19,13V7H13V13H16M6,17H9L11,13V7H5V13H8L6,17Z" />
          </svg>`
        },
        {
          name: 'olist',
          icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7,13V11H21V13H7M7,19V17H21V19H7M7,7V5H21V7H7M3,8V5H2V4H4V8H3M2,17V16H5V20H2V19H4V18.5H3V17.5H4V17H2M4.25,10A0.75,0.75 0 0,1 5,10.75C5,10.95 4.92,11.14 4.79,11.27L3.12,13H5V14H2V13.08L4,11H2V10H4.25Z" />
          </svg>`
        },
        {
          name: 'ulist',
          icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M7,5H21V7H7V5M7,13V11H21V13H7M4,4.5A1.5,1.5 0 0,1 5.5,6A1.5,1.5 0 0,1 4,7.5A1.5,1.5 0 0,1 2.5,6A1.5,1.5 0 0,1 4,4.5M4,10.5A1.5,1.5 0 0,1 5.5,12A1.5,1.5 0 0,1 4,13.5A1.5,1.5 0 0,1 2.5,12A1.5,1.5 0 0,1 4,10.5M7,19V17H21V19H7M4,16.5A1.5,1.5 0 0,1 5.5,18A1.5,1.5 0 0,1 4,19.5A1.5,1.5 0 0,1 2.5,18A1.5,1.5 0 0,1 4,16.5Z" />
          </svg>`
        },
        {
          name: 'line',
          icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M14,18V16H16V6.31L13.5,7.75V5.44L16,4H18V16H20V18H14Z" />
          </svg>`
        },
        {
          name: 'image',
          icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
              <path fill="currentColor" d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" />
          </svg>`,
          result: () => {
            const url = window.prompt('Enter the image URL')
            if (url) {
              pell.exec('insertImage', this.ensureHTTP(url))
            }
          }
        }
      ]
    }).content.innerHTML = ''
  },

  methods: {
    ensureHTTP: str => /^https?:\/\//.test(str) && (str || `http://${str}`)
  }
}
</script>
<style>

</style>
