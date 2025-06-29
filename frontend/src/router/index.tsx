import { createBrowserRouter } from 'react-router-dom';

import Login from '../pages/Login';
import Register from '../pages/Register';
import AddUser from '../pages/adduser';
import Dashboard from '../pages/Dashboard';



export const router = createBrowserRouter([
  {
    path: '/',
    element: <Dashboard />,
  },
  {
    path: '/login',
    element: <Login  />,
  },{
    path: '/adduser',
    element: <AddUser />,
  },

  {
    path: '/register',
    element: <Register />,
  },
]);
