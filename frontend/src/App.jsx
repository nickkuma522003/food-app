import React, { useState } from 'react'
import "./App.css"
import { BrowserRouter, Routes, Route, useFetcher } from "react-router-dom"
import Home from './pages/Home'
import Navbar from './components/Navbar'
import FoodDetails from './pages/FoodDetails'
import Footer from './components/Footer'
import Login from './components/Login'
import Cart from './pages/Cart'
import Menu from './pages/Menu'
import { Toaster } from "react-hot-toast"
import Services from './pages/Services'
import useFetchUser from './hooks/useFetchUser'
import NotFound from './pages/NotFound'
import Contact from './pages/Contact'
import Search from './pages/Search'
import Order from './pages/Order'
import Verify from './pages/Verify'
import MyOrders from './pages/MyOrders'
import { useSelector } from 'react-redux'
const App = () => {
  const [showLogin, setShowLogin] = useState(false)
  const user = useSelector((state) => state.auth.user)
  useFetchUser()
  return (
    <>


      {
        showLogin && <Login setShowLogin={setShowLogin} />
      }
      <Toaster />
      <BrowserRouter>

        <Navbar setShowLogin={setShowLogin} />

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/home' element={<Home />} />
          <Route path='/menu' element={<Menu />} />
          <Route path='/services' element={<Services />} />
          <Route path='/meal/:id' element={<FoodDetails />} />
          <Route path='/cart' element={<Cart />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/search' element={<Search />} />
          <Route path='/order' element={<Order />} />
          <Route path='/verify' element={<Verify />} />
          <Route path='/myorders' element={user ? <MyOrders /> : <Home />} />
          <Route path='/*' element={<NotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>


  )
}

export default App
