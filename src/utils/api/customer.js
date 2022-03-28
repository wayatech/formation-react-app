import { FDQN } from '../constants'

function list({ token }) {
  return fetch(`${FDQN}/api/customers`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

function read({ token, id }) {
  return fetch(`${FDQN}/api/customers/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })
}

const add = ({ token, body }) =>
  fetch(`${FDQN}/api/customers`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body,
  })

const edit = ({ token, id, body }) =>
  fetch(`${FDQN}/api/customers/${id}`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body,
  })

const remove = ({ token, id }) =>
  fetch(`${FDQN}/api/customers/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

export default { list, read, add, edit, remove }
