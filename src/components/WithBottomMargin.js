import { element } from 'prop-types'

function WithBottomMargin({ children }) {
  return (
    <div
      style={{
        marginBottom: 20,
        paddingBottom: 6,
        borderBottom: '1px solid grey',
      }}
    >
      {children}
    </div>
  )
}

WithBottomMargin.propTypes = {
  children: element.isRequired,
}

export default WithBottomMargin
