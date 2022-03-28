import { createRef } from 'react'
import PropTypes from 'prop-types'

function Add({ onAdd }) {
  const inputRef = createRef()

  return (
    <div style={{ marginTop: 30 }}>
      <input type="text" ref={inputRef} />
      <button
        type="button"
        onClick={() => {
          if (inputRef?.current?.value) {
            // if(inputRef && inputRef.current && inputRef.current.value) {
            onAdd({
              id: new Date().getTime(),
              value: inputRef.current.value,
            })
            inputRef.current.value = ''
          }
        }}
      >
        Add
      </button>
    </div>
  )
}

Add.propTypes = {
  onAdd: PropTypes.func.isRequired,
}

export default Add
