import React from 'react'
import { connect } from 'react-redux'
import TextInput from './TextInput'
import Button from './Button'
import { toArray } from '../helpers/reshape'
import { _addResource } from '../redux/state'

class ReduxPage extends React.Component {
  state = {
    name: false
  }
  addResource = () => {
    const { name } = this.state
    if (name) {
      this.props.addResource(name)
    }
  }
  updateName = name => {
    this.setState({ name })
  }
  render() {
    const { resources } = this.props
    return (
      <div>
        <TextInput
          testId="textInput-with-redux"
          onChange={e => this.updateName(e.target.value)}
        />
        {resources &&
          resources.map(({ id, name }) => (
            <div key={id} data-testid={`resource-${id}`}>
              {name}
            </div>
          ))}
        <Button
          testId="button-with-redux"
          onClick={this.addResource}
          text="Add"
        />
      </div>
    )
  }
}
export default connect(
  state => ({ resources: toArray(state) }),
  dispatch => ({
    addResource: name => dispatch(_addResource({ name }))
  })
)(ReduxPage)
