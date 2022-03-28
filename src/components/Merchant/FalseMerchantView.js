import { oneOfType, string, number } from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'

import { AuthContext } from '../../containers/ContextProvider'
import API from '../../utils/API'

// Fetch a customer not a merchant
function FalseMerchantView({ id }) {
  const params = useParams()
  const { customerId } = params

  const authContext = useContext(AuthContext)
  const { token } = authContext

  const [customer, setCustomer] = useState(null)

  useEffect(() => {
    setTimeout(async () => {
      const response = await API.customer.read({ token, id })
      if (response.status === 200) {
        setCustomer(await response.json())
      }
    }, 1500)
  }, [customerId])

  if (customer) {
    return (
      <div>
        <div>ID : {customer.id}</div>
        <div>Last name : {customer.lastname}</div>
        <div>First name : {customer.firstname}</div>
        <br />
        <br />
        <Link to="/customers">Back to list</Link>
      </div>
    )
  }

  return null
}

FalseMerchantView.propTypes = {
  id: oneOfType([string, number]).isRequired,
}

export default FalseMerchantView
