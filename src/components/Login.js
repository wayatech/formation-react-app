/* eslint-disable no-alert */

import { func } from 'prop-types'
import { useEffect, useRef } from 'react'

import WithBottomMargin from './WithBottomMargin'

function Login({ onLogIn }) {
  const emailRef = useRef()
  const passwordRef = useRef()

  useEffect(() => {
    emailRef.current.value = localStorage.getItem('username')
    passwordRef.current.value = localStorage.getItem('password')
  }, [])

  const login = async () => {
    try {
      const response = await fetch(
        'https://mock-api.symfony-api.intern.waya.tech/api/auth/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: emailRef?.current?.value,
            password: passwordRef?.current?.value,
          }),
        },
      )
      if (response.status === 401) {
        alert('Bad credentials')
        return
      }
      if (response.status === 200) {
        // DO NO DO THIS !!!
        localStorage.setItem('username', emailRef?.current?.value)
        localStorage.setItem('password', passwordRef?.current?.value)
        //
        const content = await response.json()
        const { token } = content
        onLogIn(token)
      }
    } catch (e) {
      alert(e.message)
    }
  }

  return (
    <>
      <h1>Login</h1>
      <WithBottomMargin>
        <label htmlFor="email">
          Email
          <input type="text" id="email" ref={emailRef} />
        </label>
      </WithBottomMargin>
      <WithBottomMargin>
        <label htmlFor="password">
          Password
          <input type="password" id="password" ref={passwordRef} />
        </label>
      </WithBottomMargin>
      <WithBottomMargin>
        <button type="submit" onClick={login}>
          Log in
        </button>
      </WithBottomMargin>
    </>
  )
}

Login.propTypes = {
  onLogIn: func.isRequired,
}

export default Login
