import { Navigate } from "react-router-dom";

const RouteProtector = ({ isLoggedIn, children }: any) => {
  if (!isLoggedIn) {
    return <Navigate to="/entry" replace />;
  }
  return children;
};
export default RouteProtector;