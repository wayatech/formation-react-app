/* eslint-disable react/jsx-props-no-spreading */
// import { oneOfType, string, number } from 'prop-types'
import { useContext, useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'

import Loader from './Loader'

import { AuthContext } from '../containers/ContextProvider'
import withDate from '../hoc/withDate'
import API from '../utils/API'

function CustomerView() {
  const params = useParams()
  const { customerId } = params

  const authContext = useContext(AuthContext)
  const { token } = authContext

  const [customer, setCustomer] = useState(null)

  const {
    register,
    handleSubmit,
    // watch,
    formState: { errors, isValid },
  } = useForm({ mode: 'onChange' })

  //   console.log(watch('example'))
  //   watch(formState.isValid)

  //   console.log(errors)

  const onSubmit = (data) => console.log('submit', data)

  useEffect(() => {
    setTimeout(async () => {
      const response = await API.customer.read({ token, id: customerId })
      if (response.status === 200) {
        setCustomer(await response.json())
      }
    }, 1500)
  }, [customerId])

  if (customer) {
    return (
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* register your input into the hook by invoking the "register" function */}
          <input
            defaultValue={customer.lastname}
            {...register('lastname', {
              pattern: {
                value: /^[A-Za-z ]+$/,
                message: 'Not digits !',
              },
              required: true,
            })}
            style={errors.lastname ? { border: '1px solid red' } : {}}
          />
          {errors.lastname && errors.lastname.message}

          {/* include validation with required or other standard HTML validation rules */}
          <input
            defaultValue={customer.firstname}
            {...register('firstname', { required: true })}
            style={errors.firstname ? { border: '1px solid red' } : {}}
          />

          <input
            defaultValue={customer.phoneNumber}
            {...register('phoneNumber')}
            style={errors.phoneNumber ? { border: '1px solid red' } : {}}
          />

          <input type="submit" />
        </form>

        {!isValid ? <div>Form is not valid</div> : null}
        <br />
        <br />
        <Link to="/customers">Back to list</Link>
      </div>
    )
  }

  return <Loader />
}

// CustomerView.propTypes = {
//   customerId: oneOfType([string, number]).isRequired,
// }

export default withDate(CustomerView)
