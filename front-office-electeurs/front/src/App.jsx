import './App.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Accueil from './pages/Accueil';
import Login from './pages/login';
import { AuthProvider } from './context/authContext'; // Import du contexte

const router = createBrowserRouter([
  { path: '/', element: <Accueil /> },
  { path: '/login', element: <Login /> }
]);

const App = () => {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  );
};

export default App;
