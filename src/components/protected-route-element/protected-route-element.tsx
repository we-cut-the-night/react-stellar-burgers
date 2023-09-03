import { Navigate, useLocation } from "react-router-dom";
import { FC } from "react";
import { getStoreUserData } from "services/selectors";
import { IPropsElement } from "utils/types";
import { useAppSelector } from "hooks";

export const ProtectedRouteElement: FC<IPropsElement> = ({ isNotAuth, element }) => {
  const { loggedIn } = useAppSelector(getStoreUserData);
  const location = useLocation();

  if (isNotAuth && loggedIn) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Navigate to={from} />;
  }

  if (!isNotAuth && !loggedIn) {
    return <Navigate to="/login" state={{ from: location }} />;
  }

  return element;

};
