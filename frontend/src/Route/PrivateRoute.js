import React from "react";
import { useSelector } from "react-redux";
import LoadingToRedirect from "./LoadingToRedirect";

const PrivateRoute = ({ children }) => {
  const { userInfo } = useSelector((state) => (state.userSignin));
  return userInfo ? children : <LoadingToRedirect />;
};

export default PrivateRoute;
