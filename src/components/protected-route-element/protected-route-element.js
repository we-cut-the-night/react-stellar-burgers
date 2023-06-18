// import { useAuth } from '../services/auth';
import { Navigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { getUserData } from 'services/actions/auth'
import { useDispatch, useSelector } from 'react-redux'

export const ProtectedRouteElement = ({ element }) => {
  const dispatch = useDispatch()
  const [isUserLoaded, setUserLoaded] = useState(false)
  const { email } = useSelector(store => store.userData)

  useEffect(() => {
    dispatch(getUserData())
    setUserLoaded(true)
  }, [dispatch])

  if (!isUserLoaded) {
    return null;
  }

  return email ? element : <Navigate to="/login" replace/>
}
