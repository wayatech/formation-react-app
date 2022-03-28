import { useContext, useEffect, useRef, useState } from 'react'
import { arrayOf, func, number, shape, string } from 'prop-types'
import WithBottomMargin from './WithBottomMargin'
import { AuthContext, ThemeContext } from '../containers/ContextProvider'
import API from '../utils/API'

function CustomerEdit({
  currentCustomer,
  setCurrentCustomer,
  customers,
  setCustomers,
}) {
  const emailRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const phoneNumberRef = useRef()

  const authContext = useContext(AuthContext)
  const themeContext = useContext(ThemeContext)
  const { token } = authContext

  useEffect(() => {
    emailRef.current.value = currentCustomer.email
    firstNameRef.current.value = currentCustomer.firstname
    lastNameRef.current.value = currentCustomer.lastname
    phoneNumberRef.current.value = currentCustomer.phoneNumber
  }, [currentCustomer])

  const [errors, setErrors] = useState([])

  const edit = async () => {
    const response = await API.customer.edit({
      token,
      id: currentCustomer.id,
      body: JSON.stringify({
        email: emailRef?.current?.value,
        firstname: firstNameRef?.current?.value,
        lastname: lastNameRef?.current?.value,
        phoneNumber: phoneNumberRef?.current?.value,
      }),
    })

    if (response.status === 200 || response.status === 400) {
      const content = await response.json()
      if (response.status === 200) {
        setErrors([])
        setCustomers(
          customers.map((customer) => {
            if (customer.id === content.id) {
              return content
            }
            return customer
          }),
        )
        setCurrentCustomer(null)
        return
      }
      if (response.status === 400) {
        setErrors(
          content.violations.map((violation) => ({
            field: violation.propertyPath,
            message: violation.title,
          })),
        )
      }
    }
  }

  return (
    <div className={themeContext.theme}>
      <hr />
      <h2>EDIT</h2>
      <hr />
      <WithBottomMargin>
        <label htmlFor="email">
          Email
          <input type="text" id="email" ref={emailRef} />
        </label>
      </WithBottomMargin>
      <WithBottomMargin>
        <label htmlFor="firstName">
          First Name
          <input type="text" id="firstName" ref={firstNameRef} />
        </label>
      </WithBottomMargin>
      <WithBottomMargin>
        <label htmlFor="lastName">
          Last Name
          <input type="text" id="lastName" ref={lastNameRef} />
        </label>
      </WithBottomMargin>
      <WithBottomMargin>
        <label htmlFor="phoneNumber">
          Phone Number
          <input type="text" id="phoneNumber" ref={phoneNumberRef} />
        </label>
      </WithBottomMargin>
      <WithBottomMargin>
        <>
          <button type="submit" onClick={edit}>
            Edit customer
          </button>
          <button type="button" onClick={() => setCurrentCustomer(null)}>
            Cancel
          </button>
        </>
      </WithBottomMargin>

      {errors.length ? (
        <div style={{ marginTop: 30, color: 'red' }}>
          {errors.map((error) => (
            <span key={error.field}>{`${error.field}: ${error.message}`}</span>
          ))}
        </div>
      ) : null}
    </div>
  )
}

const customerProp = shape({
  id: number,
  email: string,
  lastname: string,
  firstname: string,
  phoneNumber: string,
})

CustomerEdit.propTypes = {
  customers: arrayOf(customerProp).isRequired,
  currentCustomer: customerProp.isRequired,
  setCustomers: func.isRequired,
  setCurrentCustomer: func.isRequired,
}

export default CustomerEdit
