import { Navigate } from "react-router-dom";
import { FC } from "react";
import { getStoreUserData } from "services/selectors";
import { IPropsElement } from "utils/types";
import { useAppSelector } from "hooks";

export const ProtectedRouteElement: FC<IPropsElement> = ({ element }) => {
  const { loggedIn } = useAppSelector(getStoreUserData);
  const refreshToken = localStorage.getItem("refreshToken");

  return loggedIn || refreshToken ? element : <Navigate to="/login" replace />;
};
