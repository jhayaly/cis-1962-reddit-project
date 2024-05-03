import HomePage from './homepage';
import Login from './login';
import SignUp from './signup';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Category from './category';
import './app.css';

const router = createHashRouter([
  {
    path: '/',
    element: <HomePage />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'signup', element: <SignUp /> },
      { path: 'category/:category', element: <Category /> }
    ]
  }
]);

const App = () => {
  return (
      <RouterProvider
        router={router}
      />
  );
};


export default App;
