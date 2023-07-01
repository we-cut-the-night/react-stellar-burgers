import {BASE_URL} from './constants'

const headers = {
  'Content-Type': 'application/json',
}

const checkResponse = (res: Response) => {
  if (res.ok) {
    return res.json()
  }
  // return Promise.reject(res);
  return res.json()
    .then((data) => {
      throw new Error(data.message)
    });
}

export const getIngridientsData = () => {
  return fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: headers,
  })
  .then(checkResponse)
}

export const postOrder = (data: object) => {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(checkResponse)
}

export const postAuth = (data: object, action: string) => {
  return fetch(`${BASE_URL}/auth/${action}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
  .then(checkResponse)
}

export const postPassword = (data: object, action: string) => {
  const endpoint = action ? `password-reset/${action}` : "password-reset"
  return fetch(`${BASE_URL}/${endpoint}`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
  .then(checkResponse)
}

export const getUser = (token: string) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
  })
  .then(checkResponse)
}

export const patchUser = (data: object, token: string) => {
  return fetch(`${BASE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      authorization: token,
    },
    body: JSON.stringify(data)
  })
  .then(checkResponse)
}
