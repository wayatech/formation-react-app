import { useContext, useEffect } from 'react'
import { arrayOf, func, number, shape, string } from 'prop-types'
import { useNavigate } from 'react-router-dom'
import API from '../utils/API'
import { AuthContext } from '../containers/ContextProvider'

function CustomerList({ customers, setCustomers, setCurrentCustomer }) {
  const authContext = useContext(AuthContext)

  const navigate = useNavigate()

  const { token } = authContext
  // = const token = authContext.token

  const refresh = async () => {
    // Old school
    // API.list({ token }).then(
    //   (response) => {
    //     ...
    //   },
    //   () => {},
    // )
    // New school
    const response = await API.customer.list({ token })
    //
    if (response.status === 200) {
      const content = await response.json()
      setCustomers(content)
    }
  }

  const remove = async (id) => {
    const response = await API.customer.remove({ token, id })
    // console.log(response)
    if (response.status === 200) {
      setCustomers(customers.filter((customer) => customer.id !== id))
    }
  }

  useEffect(() => refresh(), [])

  return (
    <table>
      <thead>
        <tr>
          <th colSpan="*">
            <button type="button" onClick={refresh}>
              Refresh
            </button>
          </th>
        </tr>
        <tr>
          <th>*</th>
          <th>ID</th>
          <th>Email</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Phone</th>
          <th>x</th>
        </tr>
      </thead>
      <tbody>
        {customers.map((customer) => (
          <tr key={customer.id}>
            <td>
              <button
                type="button"
                onClick={() => setCurrentCustomer(customer)}
              >
                edit
              </button>{' '}
              <button
                type="button"
                onClick={() => navigate(`/customers/${customer.id}`)}
              >
                view
              </button>
            </td>
            <td>{customer.id}</td>
            <td>{customer.email}</td>
            <td>{customer.firstname}</td>
            <td>{customer.lastname}</td>
            <td>{customer.phoneNumber}</td>
            <td>
              <button
                type="button"
                onClick={() => {
                  remove(customer.id)
                }}
              >
                X
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

CustomerList.propTypes = {
  customers: arrayOf(shape({ id: number, email: string })).isRequired,
  setCustomers: func.isRequired,
  setCurrentCustomer: func.isRequired,
}

export default CustomerList
