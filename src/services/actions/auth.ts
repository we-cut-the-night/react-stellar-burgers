
import { setCookies, deleteCookies, getCookies } from "utils/cookies"
import { postAuth, postPassword, getUser, patchUser } from "utils/api"
import {
  LOGIN,
  LOGOUT,
  SET_USER_DATA,
  RESET_PASSWORD_START,
  RESET_PASSWORD_END
} from "./index"
import { IStringValues, AppThunkAction } from "utils/types"

export const createUser = (data: IStringValues, navigate: () => void): AppThunkAction => {
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

export const login = (data: IStringValues, navigate: () => void): AppThunkAction => {
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

export const logout = (data: IStringValues, navigate: () => void): AppThunkAction => {
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

export const resetPasswordStart = (data: IStringValues, navigate: () => void): AppThunkAction => {
  return function (dispatch) {
    postPassword(data, '')
      .then(() => {
        dispatch({ type: RESET_PASSWORD_START })
        navigate()
      })
      .catch(err => console.log(`Error(reset password start): ${err}`))
  }
}

export const resetPasswordEnd = (data: IStringValues, navigate: () => void): AppThunkAction => {
  return function (dispatch) {
    postPassword(data, "reset")
      .then(() => {
        dispatch({ type: RESET_PASSWORD_END })
        navigate()
      })
      .catch(err => console.log(`Error(reset password end): ${err}`))
  }
}

export const getUserData = (): AppThunkAction => {
  return function (dispatch) {
    const accessToken = getCookies('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    if (!accessToken && !refreshToken) {
      dispatch({
        type: SET_USER_DATA,
        data: {
          loggedIn: false,
          email: '',
          name: '',
        }
      });
      return
    }
    if (!accessToken && refreshToken) {
      refreshTokenAndGetUser()
        .then(res => {
          dispatch({
            type: SET_USER_DATA,
            data: {
              loggedIn: true,
              email: res.user.email,
              name: res.user.name
            }
          });
        })
        .catch(err => {
          console.log(`Error(getUserData): ${err}`)
          dispatch({
            type: SET_USER_DATA,
            data: {
              loggedIn: false,
              email: '',
              name: '',
            }
          });
        })
    }
    getUser('Bearer ' + accessToken)
      .then(res => {
        dispatch({
          type: SET_USER_DATA,
          data: {
            loggedIn: true,
            email: res.user.email,
            name: res.user.name
          }
        });
      })
      .catch(() =>
        refreshTokenAndGetUser()
          .then(res => {
            dispatch({
              type: SET_USER_DATA,
              data: {
                loggedIn: true,
                email: res.user.email,
                name: res.user.name
              }
            });
          })
          .catch(err => {
            console.log(`Error(getUserData): ${err}`)
            dispatch({
              type: SET_USER_DATA,
              data: {
                loggedIn: false,
                email: '',
                name: '',
              }
            });
          })
      )
  }
}

export const updateUserData = (data: IStringValues): AppThunkAction => {
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

export const refreshTokenAndGetUser = async (): Promise<any> => {
  const data = { token: localStorage.getItem('refreshToken') }

  if (data.token) {
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
    return Promise.reject()
  }
}

const refreshTokenAndPatchUser = async (err: {status: number}, userData: IStringValues): Promise<any> => {
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
