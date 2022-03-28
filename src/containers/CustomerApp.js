import { useContext, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import { useNavigate } from 'react-router-dom'

import Login from '../components/Login'
import Customer from '../components/Customer'
import DisplayTokenExpire from '../components/DisplayTokenExpire'
import TestReducer from '../components/TestReducer'
import { AuthContext, ThemeContext } from './ContextProvider'
// import MyComponent from '../components/MyComponent'

function CustomerApp() {
  const authContext = useContext(AuthContext)
  const themeContext = useContext(ThemeContext)

  const { token, decodedToken, setToken, setDecodedToken } = authContext
  const { theme, toggleTheme } = themeContext

  const navigate = useNavigate()

  // Reducer
  // function reducer(state, action) {
  //   switch (action.type) {
  //     case 'LOGOUT':
  //       return {
  //         token: null,
  //         decodedToken: null,
  //       }
  //     default:
  //       throw new Error()
  //   }
  // }

  // const [state, dispatch] = useReducer(reducer, {
  //   token: null,
  //   decodedToken: null,
  // })
  //

  const logout = () => {
    // With reducer
    // dispatch({ type: 'LOGOUT' })

    // With context
    setToken(null)
    setDecodedToken(null)
    localStorage.removeItem('token')
    localStorage.removeItem('decodedToken')
  }

  const checkTokenValidity = () => {
    if (decodedToken) {
      if (decodedToken.exp * 1000 < new Date().getTime()) {
        logout()
        alert('Token has expired. Please re-authenticate.')
      }
    }
  }

  useEffect(() => {
    const interval = setInterval(() => {
      checkTokenValidity()
    }, 30000)

    return () => {
      clearInterval(interval)
    }
  }, [])

  useEffect(() => {
    checkTokenValidity()
  }, [decodedToken])

  const onLogIn = (jwt) => {
    setToken(jwt)
    localStorage.setItem('token', jwt)
    const decoded = jwtDecode(jwt)
    setDecodedToken(decoded)
    localStorage.setItem('decodedToken', JSON.stringify(decoded))
  }

  return (
    <>
      <div className={theme}>
        {token ? (
          <>
            <header>
              {decodedToken?.username}{' '}
              <button type="button" onClick={logout}>
                x
              </button>{' '}
              <button type="button" onClick={toggleTheme}>
                Change theme
              </button>
            </header>
            <Customer />
            <DisplayTokenExpire />
            <TestReducer />
            {/* <MyComponent /> */}
          </>
        ) : (
          <Login onLogIn={onLogIn} />
        )}
      </div>
      <br />
      <br />
      <button
        type="button"
        onClick={() => {
          navigate('/')
        }}
      >
        Go back to home page
      </button>
    </>
  )
}

export default CustomerApp
