import React from 'react'
import { Navbar } from '../Component/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import { Home } from '../Component/Home/Home'
import { RestaurantDetails } from '../Component/Restaurant/RestaurantDetails'
import { Cart } from '../Component/Cart/Cart'
import { Profile } from '../Component/Profile/Profile'
import { Auth } from '../Component/Auth/Auth'

export const CustomerRoute = () => {
  return (
    <div>
        <Navbar/>
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/account/:register' element={<Home/>} />
            <Route path='/restaurant/:city/:title/:id' element={<RestaurantDetails/>} />
            <Route path='/cart' element={<Cart/>} />
            <Route path='/my-profile/*' element={<Profile/>} />
        </Routes>
        <Auth/>
    </div>
  )
}
