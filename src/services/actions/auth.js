
import { setCookies, deleteCookies, getCookies } from "utils/cookies"
import { postAuth, postPassword, getUser, patchUser } from "utils/api"
import {
  LOGIN,
  LOGOUT,
  SET_USER_DATA,
  RESET_PASSWORD_START,
  RESET_PASSWORD_END
} from "./index"
// postAuth(data, register||login||logout||token - ?)
// postPassword(data, reset||null)
// getUser()
// patchUser(data)

export const createUser = (data, navigate) => {
  return function (dispatch) {
    postAuth(data, "register")
      .then(res => {
        dispatch({
          type: SET_USER_DATA,
          data: {
            email: res.user.email,
            name: res.user.name
          }
        })
        dispatch({ type: LOGIN })
        localStorage.setItem('refreshToken', res.refreshToken)
        const token = res.accessToken.split('Bearer ')[1]
        setCookies('accessToken', token, {
          expires: 1200,
          SameSite: 'None',
          Secure: true
        })
        navigate()
      })
      .catch(err => console.log(`Error(register): ${err}`))
  }
}

export const login = (data, navigate) => {
  return function (dispatch) {
    postAuth(data, "login")
      .then(res => {
        dispatch({
          type: SET_USER_DATA,
          data: {
            email: res.user.email,
            name: res.user.name
          }
        })
        dispatch({ type: LOGIN })
        localStorage.setItem('refreshToken', res.refreshToken)
        const token = res.accessToken.split('Bearer ')[1]
        setCookies('accessToken', token, {
          expires: 1200,
          SameSite: 'None',
          Secure: true
        })
        navigate()
      })
      .catch(err => console.log(`Error(login): ${err}`))
  }
}

export const logout = (data, navigate) => {
  return function (dispatch) {
    postAuth(data, "logout")
      .then(() => {
        dispatch({
          type: SET_USER_DATA,
          data: {
            email: '',
            name: '',
          }
        })
        dispatch({ type: LOGOUT })
        localStorage.clear()
        deleteCookies('accessToken')
        navigate()
      })
      .catch(err => console.log(`Error(logout): ${err}`))
  }
}

export const resetPasswordStart = (data, navigate) => {
  return function (dispatch) {
    postPassword(data, null)
      .then(() => {
        dispatch({ type: RESET_PASSWORD_START })
        navigate()
      })
      .catch(err => console.log(`Error(reset password start): ${err}`))
  }
}

export const resetPasswordEnd = (data, navigate) => {
  return function (dispatch) {
    postPassword(data, "reset")
      .then(() => {
        dispatch({ type: RESET_PASSWORD_END })
        navigate()
      })
      .catch(err => console.log(`Error(reset password end): ${err}`))
  }
}

export const getUserData = () => {
  return function (dispatch) {
    const token = 'Bearer ' + getCookies('accessToken')
    getUser(token)
      .then(res => {
        dispatch({
          type: SET_USER_DATA,
          data: {
            email: res.user.email,
            name: res.user.name
          }
        });
      })
      .catch(err =>
        refreshTokenAndGetUser(err)
        .then(res => {
          dispatch({
            type: SET_USER_DATA,
            data: {
              email: res.user.email,
              name: res.user.name
            }
          });
        })
        .catch(err => console.log(`Error(getUserData): ${err}`))
      )
  }
}

export const updateUserData = (data) => {
  return function (dispatch) {
    const token = 'Bearer ' + getCookies('accessToken')
    patchUser(data, token)
      .then(res => {
        dispatch({
          type: SET_USER_DATA,
          data: {
            email: res.user.email,
            name: res.user.name
          }
        });
      })
      .catch(err =>
        refreshTokenAndPatchUser(err, data)
        .then(res => {
          dispatch({
            type: SET_USER_DATA,
            data: {
              email: res.user.email,
              name: res.user.name
            }
          });
        })
        .catch(err => console.log(`Error(updateUserData): ${err}`))
      )
  }
}

const refreshTokenAndGetUser = async (err) => {

  if (err.status === 403) {

    const data = { token: localStorage.getItem('refreshToken') }
    deleteCookies('accessToken')

    await postAuth(data, "token")
      .then(res => {
        const token = res.accessToken.split('Bearer ')[1]
        localStorage.setItem('refreshToken', res.refreshToken)
        setCookies('accessToken', token, {
          expires: 1200,
          SameSite: 'None',
          Secure: true
        })
      })
      .catch(err => console.log(`Error(refreshToken): ${err}`))

    const token = 'Bearer ' + getCookies('accessToken')
    const res = await getUser(token)

    return res;
  } else {
    return Promise.reject(err)
  }
}

const refreshTokenAndPatchUser = async (err, userData) => {
  if (err.status === 403) {
    const data = { token: localStorage.getItem('refreshToken') }
    deleteCookies('accessToken')

    await postAuth(data, "token")
      .then(res => {
        const token = res.accessToken.split('Bearer ')[1]
        localStorage.setItem('refreshToken', res.refreshToken)
        setCookies('accessToken', token, {
          expires: 1200,
          SameSite: 'None',
          Secure: true
        })
      })
      .catch(err => console.log(`Error(refreshToken): ${err}`))

    const token = 'Bearer ' + getCookies('accessToken')
    const res = await patchUser(userData, token)

    return res;
  } else {
    return Promise.reject(err)
  }
}
