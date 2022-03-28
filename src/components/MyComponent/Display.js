/* eslint-disable react/prefer-stateless-function */
import { Component } from 'react'
import { oneOfType, number, string, shape } from 'prop-types'

class Display extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    if (typeof nextProps.value === 'number') {
      return false
    }
    return true
  }

  render() {
    const { value } = this.props

    return <div>Class : {JSON.stringify(value)}</div>
  }
}

Display.propTypes = {
  value: oneOfType([shape({}), string, number]).isRequired,
}
export default Display
