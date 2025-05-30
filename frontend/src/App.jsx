import React from 'react'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import Home from './pages/Home'
import Matches from './pages/Matches'
import { ToastContainer } from 'react-toastify'
import { PageNotFound } from './components/index.js'

const router = createBrowserRouter([
  {
    path: '/',
    element:<Home/>
  },
  {
    path: '/matches',
    element:<Matches/>
  },
  {
    path: '*',
    element:<PageNotFound/>
  },
])

const App = () => {
  return (
    <div className='bg-gray-100'>
      <ToastContainer/>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
