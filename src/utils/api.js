import {BASE_URL} from './constants'

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
  return fetch(`${BASE_URL}/api/ingredients`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(checkResponse)
}
