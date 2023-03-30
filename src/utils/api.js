import {BASE_URL} from './constants'

const headers = {
  'Content-Type': 'application/json',
}

const checkResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return res.json()
    .then((data) => {
      throw new Error(data.message);
    });
};

export const getIngridientsData = () => {
  return fetch(`${BASE_URL}/ingredients`, {
    method: 'GET',
    headers: headers,
  })
  .then(checkResponse)
}

export const postOrder = (data) => {
  return fetch(`${BASE_URL}/orders`, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data)
  })
    .then(checkResponse)
}
