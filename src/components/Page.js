import React from 'react'
import Button from './Button'
import Jumbotron from './Jumbotron'
import TextInput from './TextInput'

class Page extends React.Component {
  state = {
    toggle: false,
    message: false
  }
  onChange = e => {
    this.setState({ message: e.target.value })
  }
  toggleMessage = () => {
    const { toggle } = this.state
    this.setState({ toggle: !toggle })
  }
  render() {
    const { message, toggle } = this.state
    return (
      <div>
        <TextInput testId="textInput-no-redux" onChange={this.onChange} />
        <Button testId="button-no-redux" onClick={this.toggleMessage} />
        <Jumbotron
          testId="jumbotron"
          message={toggle ? (message ? message : 'Hi') : 'Lo'}
        />
      </div>
    )
  }
}

export default Page
