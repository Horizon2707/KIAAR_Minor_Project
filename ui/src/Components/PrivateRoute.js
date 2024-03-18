import { Route, Navigate } from "react-router-dom";

const PrivateRoute = ({ element: Element, ...rest }) => {
  const userData = sessionStorage.getItem("user");

  return (
    <Route
      {...rest}
      element={userData ? <Element /> : <Navigate to="/" replace />}
    />
  );
};

export default PrivateRoute;
