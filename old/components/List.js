import { arrayOf, func, number, shape, string } from 'prop-types'

function List({ list, onRemove }) {
  return (
    <ul style={{ border: '1px solid green', margin: 20 }}>
      {list.map((item) => (
        <li key={item.id}>
          <button
            type="button"
            onClick={() => {
              onRemove(item)
            }}
          >
            X
          </button>{' '}
          - {item.value}
        </li>
      ))}
    </ul>
  )
}

List.propTypes = {
  list: arrayOf(
    shape({
      id: number,
      value: string,
    }),
  ).isRequired,
  onRemove: func.isRequired,
}

export default List
