import { useReducer } from 'react'

function TestReducer() {
  const initialState = {
    value1: 'Hello',
    value2: 'Bonjour',
  }

  function reducer(state, action) {
    switch (action.type) {
      case 'ADD_HASHTAG':
        return {
          value1: `${state.value1} #`,
          value2: `${state.value2} #`,
        }
      case 'ADD_WILDCARD':
        return {
          value1: `${state.value1} *`,
          value2: `${state.value2} *`,
        }
      case 'ADD_CHAR':
        return {
          value1: `${state.value1} ${action.payload}`,
          value2: `${state.value2} ${action.payload}`,
        }
      default:
        throw new Error()
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState)

  const { value1, value2 } = state

  return (
    <div>
      <div>Value 1 : {value1}</div>
      <div>Value 2 : {value2}</div>
      <div>
        <button
          type="button"
          onClick={() => {
            dispatch({ type: 'ADD_HASHTAG' })
          }}
        >
          Add #
        </button>
        -
        <button
          type="button"
          onClick={() => {
            dispatch({ type: 'ADD_WILDCARD' })
          }}
        >
          Add *
        </button>
        -
        <button
          type="button"
          onClick={() => {
            dispatch({ type: 'ADD_CHAR', payload: '%' })
          }}
        >
          Add char
        </button>
      </div>
    </div>
  )
}

export default TestReducer
