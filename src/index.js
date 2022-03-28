import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import List from './components/List'
import reportWebVitals from './reportWebVitals'

const myLists = document.getElementsByClassName('react-list')
if (myLists) {
  // eslint-disable-next-line no-restricted-syntax
  for (const list of myLists) {
    ReactDOM.render(<List />, list)
  }
}

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
