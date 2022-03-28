import { Component } from 'react'

import Display from './Display'
import Display2 from './Display2'

class MyComponent extends Component {
  constructor(props) {
    super(props)
    this.state = {
      aaa: 'aaa',
      bbb: {
        b1: 'b1',
        b2: 'b2',
        b3: 'b3',
      },
    }
  }

  render() {
    return (
      <div>
        <button
          type="button"
          onClick={() => {
            this.setState({
              aaa: new Date().getTime(),
            })
          }}
        >
          Change aaa
        </button>
        <div>----</div>
        <button
          type="button"
          onClick={() => {
            this.setState((s) => ({
              bbb: {
                ...s.bbb,
                b1: new Date().getTime(),
              },
            }))
          }}
        >
          Change bbb
        </button>
        <div>----</div>
        <button
          type="button"
          onClick={() => {
            this.setState({
              bbb: {
                ...this.state.bbb,
                b2: new Date().getTime(),
              },
            })
          }}
        >
          Change bbb again
        </button>
        <div>###</div>
        <Display value={this.state.aaa} />
        <Display value={this.state.bbb} />
        <Display2 value={this.state.aaa} />
        <Display2 value={this.state.bbb} />
      </div>
    )
  }
}

export default MyComponent
