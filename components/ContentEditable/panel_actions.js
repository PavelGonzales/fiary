export const exec = (command, value = null) => document.execCommand(command, false, value)
const queryCommandState = command => document.queryCommandState(command)

export default {
  heading1: {
    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M14,18V16H16V6.31L13.5,7.75V5.44L16,4H18V16H20V18H14Z" />
          </svg>`,
    title: 'Heading 1',
    handler: () => exec('formatBlock', '<h1>')
  },
  heading2: {
    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M3,4H5V10H9V4H11V18H9V12H5V18H3V4M21,18H15A2,2 0 0,1 13,16C13,15.47 13.2,15 13.54,14.64L18.41,9.41C18.78,9.05 19,8.55 19,8A2,2 0 0,0 17,6A2,2 0 0,0 15,8H13A4,4 0 0,1 17,4A4,4 0 0,1 21,8C21,9.1 20.55,10.1 19.83,10.83L15,16H21V18Z" />
          </svg>`,
    title: 'Heading 2',
    handler: () => exec('formatBlock', '<h2>')
  },
  paragraph: {
    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13,4A4,4 0 0,1 17,8A4,4 0 0,1 13,12H11V18H9V4H13M13,10A2,2 0 0,0 15,8A2,2 0 0,0 13,6H11V10H13Z" />
          </svg>`,
    title: 'Paragraph',
    handler: () => exec('formatBlock', '<p>')
  },
  bold: {
    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M13.5,15.5H10V12.5H13.5A1.5,1.5 0 0,1 15,14A1.5,1.5 0 0,1 13.5,15.5M10,6.5H13A1.5,1.5 0 0,1 14.5,8A1.5,1.5 0 0,1 13,9.5H10M15.6,10.79C16.57,10.11 17.25,9 17.25,8C17.25,5.74 15.5,4 13.25,4H7V18H14.04C16.14,18 17.75,16.3 17.75,14.21C17.75,12.69 16.89,11.39 15.6,10.79Z" />
          </svg>`,
    title: 'Bold',
    state: () => queryCommandState('bold'),
    handler: () => exec('bold')
  },
  italic: {
    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M10,4V7H12.21L8.79,15H6V18H14V15H11.79L15.21,7H18V4H10Z" />
          </svg>`,
    title: 'Italic',
    state: () => queryCommandState('italic'),
    handler: () => exec('italic')
  },
  underline: {
    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,21H19V19H5V21M12,17A6,6 0 0,0 18,11V3H15.5V11A3.5,3.5 0 0,1 12,14.5A3.5,3.5 0 0,1 8.5,11V3H6V11A6,6 0 0,0 12,17Z" />
          </svg>`,
    title: 'Underline',
    state: () => queryCommandState('underline'),
    handler: () => exec('underline')
  },
  line: {
    icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
            <path fill="currentCOlor" d="M19,13H5V11H19V13Z" />
          </svg>`,
    title: 'Horizontal Line',
    handler: () => exec('insertHorizontalRule')
  }
}
