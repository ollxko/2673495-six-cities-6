import { Navigate } from 'react-router-dom';

type PrivateRouteProps = {
  children: JSX.Element;
  isAuthorized: boolean;
};

export default function PrivateRoute({ children, isAuthorized }: PrivateRouteProps): JSX.Element {
  return isAuthorized ? children : <Navigate to="/login" />;
}
