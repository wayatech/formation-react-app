import { oneOfType, number, string, shape } from 'prop-types'

function Display2({ value }) {
  return <div>Function : {JSON.stringify(value)}</div>
}

Display2.propTypes = {
  value: oneOfType([shape({}), string, number]).isRequired,
}

export default Display2
