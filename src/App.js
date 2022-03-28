import { BrowserRouter } from 'react-router-dom'

import ContextProvider from './containers/ContextProvider'
import MainRouter from './containers/MainRouter'

import './assets/scss/theme.scss'

function App() {
  return (
    <ContextProvider>
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </ContextProvider>
  )
}

export default App
