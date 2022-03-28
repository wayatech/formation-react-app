/* eslint-disable react/jsx-no-constructed-context-values */
import { element } from 'prop-types'
import { createContext, useState } from 'react'

export const AuthContext = createContext(null)
export const ThemeContext = createContext(null)

function ContextProvider({ children }) {
  const [theme, setTheme] = useState('light')

  const [token, setToken] = useState(localStorage.getItem('token'))
  const [decodedToken, setDecodedToken] = useState(
    localStorage.getItem('decodedToken')
      ? JSON.parse(localStorage.getItem('decodedToken'))
      : null,
  )

  function toggleTheme() {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <AuthContext.Provider
      value={{ token, decodedToken, setToken, setDecodedToken }}
    >
      <ThemeContext.Provider value={{ theme, toggleTheme }}>
        {children}
      </ThemeContext.Provider>
    </AuthContext.Provider>
  )
}

ContextProvider.propTypes = {
  children: element.isRequired,
}

export default ContextProvider
