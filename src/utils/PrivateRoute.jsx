import { Navigate, Outlet } from 'react-router-dom'

const PrivateRoute = () => {
    const token = localStorage.getItem('authToken');

    if (token) {
        return <Outlet />;
    }

    return <Navigate to="/" />;
}

export default PrivateRoute;