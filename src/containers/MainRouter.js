import { lazy, Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'

import CustomerApp from './CustomerApp'
import Home from '../components/Home'
import CustomerView from '../components/CustomerView'

const Merchant = lazy(() => import('../components/Merchant'))

function MainRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="customers" element={<CustomerApp />} />
      <Route path="customers/:customerId" element={<CustomerView />} />
      <Route
        path="merchant"
        element={
          <Suspense fallback={<>...</>}>
            <Merchant />
          </Suspense>
        }
      />
    </Routes>
  )
}

export default MainRouter
