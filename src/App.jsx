// import './App.css'
// import LoginPage from './pages/login page/LoginPage'
// import CommonDashboardPage from './pages/common dashboard/CommonDashboardPage'
// import GymDashboardPage from './pages/gym dashboard/GymDashboardPage';
// import { createBrowserRouter, RouterProvider } from 'react-router-dom';
// import PrivateRoute from './utils/PrivateRoute'

// let router = createBrowserRouter([
//   {
//     path: '/',
//     element: <LoginPage />
//   },
//   {
//     element: <PrivateRoute />, // Protect below routes
//     children: [
//       { path: '/dashboard/*', element: <CommonDashboardPage /> },
//       { path: '/gymdashboard/*', element: <GymDashboardPage /> },
//     ],
//   }
// ]);

// function App() {

//   return <RouterProvider router={router} />
// }

// export default App


import './App.css'
import LoginPage from './pages/login page/LoginPage'
import CommonDashboardPage from './pages/common dashboard/CommonDashboardPage'
import GymDashboardPage from './pages/gym dashboard/GymDashboardPage';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute'

let router = createBrowserRouter([
  { path: '/', element: <LoginPage /> },
  { path: '/dashboard/*', element: <CommonDashboardPage /> },
  { path: '/gymdashboard/*', element: <GymDashboardPage /> }
]);

function App() {

  return <RouterProvider router={router} />
}

export default App
