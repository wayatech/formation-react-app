/* eslint-disable react/jsx-no-constructed-context-values */
import { useState } from 'react'
import CustomerAdd from './CustomerAdd'
import CustomerEdit from './CustomerEdit'
import CustomerList from './CustomerList'

import { ThemeContext } from '../containers/ContextProvider'

function Customer() {
  const [customers, setCustomers] = useState([])
  const [currentCustomer, setCurrentCustomer] = useState(null)

  return (
    <>
      <CustomerList
        customers={customers}
        setCustomers={setCustomers}
        setCurrentCustomer={setCurrentCustomer}
      />
      {currentCustomer ? (
        <ThemeContext.Provider value={{ theme: 'dark' }}>
          <CustomerEdit
            customers={customers}
            currentCustomer={currentCustomer}
            setCustomers={setCustomers}
            setCurrentCustomer={setCurrentCustomer}
          />
        </ThemeContext.Provider>
      ) : (
        <CustomerAdd customers={customers} setCustomers={setCustomers} />
      )}
    </>
  )
}

export default Customer
