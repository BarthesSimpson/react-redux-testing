import pretty from 'pretty'

export default element => {
  console.log(pretty(element.outerHTML))
}
