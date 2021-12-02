// https://vuetifyjs.com/en/styles/colors/#material-colors

const colors = [
  '#F44336', // red
  '#E91E63', // pink
  '#9C27B0', // purple
  '#2196F3', // blue
  '#009688', // teal
  '#4CAF50', // green
  '#8BC34A', // light-green
  '#CDDC39', // lime
  '#FFC107', // amber
  '#FF9800' // orange
]

export const fromInteger = (i) => {
  const index = i.toString().slice(-1)
  return colors[parseInt(index)]
}

export default (context, inject) => {
  inject('color', fromInteger)
}
