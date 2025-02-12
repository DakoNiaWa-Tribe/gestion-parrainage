
import './App.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Accueil from './pages/Accueil'
import Login from './pages/login'

//ramataaaaaaaaa

function App() {

  const router= createBrowserRouter([

    {
      path:'/',
      element: <Accueil/>
    },
    {
      path: '/login',
      element: <Login/>
    }
  ])

  return <RouterProvider router={router}/>
}

export default App
