import './App.css'
import LoginPage from './pages/login page/LoginPage'
import CommonDashboardPage from './pages/common dashboard/CommonDashboardPage'
import GymDashboardPage from './pages/gym dashboard/GymDashboardPage';
import { useState } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute'

function App() {
  const [loginPerson, setLoginPerson] = useState(localStorage.getItem('username') || '');

  const router = createBrowserRouter([
    {
      path: '/',
      element: <LoginPage storeLoginPerson={setLoginPerson} />
    },
    {
      element: <PrivateRoute />, // Protect below routes
      children: [
        { path: '/dashboard/*', element: <CommonDashboardPage loginPerson={loginPerson} /> },
        { path: '/gymdashboard/*', element: <GymDashboardPage loginPerson={loginPerson} /> },
      ],
    }
  ]);

  return <RouterProvider router={router} />
}

export default App
