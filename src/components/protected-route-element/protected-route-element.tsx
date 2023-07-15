// import { useAuth } from '../services/auth';
import { Navigate } from 'react-router-dom'
import { useEffect, useState, FC } from 'react'
import { getUserData } from 'services/actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { getStoreUserData } from 'services/selectors'
import { AppDispatch, IPropsElement } from 'utils/types'

export const ProtectedRouteElement: FC<IPropsElement> = ({ element }) => {
  const dispatch = useDispatch<AppDispatch>()
  const [isUserLoaded, setUserLoaded] = useState(false)
  const { email }: {email: string} = useSelector(getStoreUserData)

  useEffect(() => {
    !email && dispatch(getUserData())
    setUserLoaded(true)
  }, [dispatch, email])

  if (!isUserLoaded) {
    return null;
  }

  return email ? element : <Navigate to="/login" replace/>
}
