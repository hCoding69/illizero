import { createBrowserRouter } from 'react-router-dom';
// import Login from '../pages/Login';
// import Register from '../pages/Register';
import App from '../App';
import Login from '../pages/Login';
import Register from '../pages/Register';
import AddUser from '../pages/adduser';



export const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
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
