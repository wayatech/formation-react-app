import { useRef, useState } from 'react'
import { arrayOf, func, number, shape, string } from 'prop-types'
import WithBottomMargin from './WithBottomMargin'
import API from '../utils/API'
import { AuthContext } from '../containers/ContextProvider'

function CustomerAddBis({ customers, setCustomers }) {
  const emailRef = useRef()
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const phoneNumberRef = useRef()

  const [errors, setErrors] = useState([])

  return (
    <AuthContext.Consumer>
      {(contextValue) => (
        <>
          <hr />
          <h2>ADD</h2>
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
            <button
              type="submit"
              onClick={async () => {
                const response = await API.customer.add({
                  token: contextValue.token,
                  body: JSON.stringify({
                    email: emailRef?.current?.value,
                    firstName: firstNameRef?.current?.value,
                    lastName: lastNameRef?.current?.value,
                    phoneNumber: phoneNumberRef?.current?.value,
                  }),
                })

                if (response.status === 201 || response.status === 400) {
                  const content = await response.json()
                  //   console.log(content)
                  if (response.status === 201) {
                    setErrors([])
                    setCustomers([...customers, content])
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
              }}
            >
              Add customer
            </button>
          </WithBottomMargin>

          {errors.length ? (
            <div style={{ marginTop: 30, color: 'red' }}>
              {errors.map((error) => (
                <span
                  key={error.field}
                >{`${error.field}: ${error.message}`}</span>
              ))}
            </div>
          ) : null}
        </>
      )}
    </AuthContext.Consumer>
  )
}

CustomerAddBis.propTypes = {
  customers: arrayOf(shape({ id: number, email: string })).isRequired,
  setCustomers: func.isRequired,
}

export default CustomerAddBis
