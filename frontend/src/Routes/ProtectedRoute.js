/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import IsSessionExpired from "../const/session";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("token");
  console.log(token,IsSessionExpired(token))
  if (!token || IsSessionExpired(token) ) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

export default ProtectedRoute;
