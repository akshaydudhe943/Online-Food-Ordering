import React, { useState } from 'react'
import { Profilenavigation } from './ProfileNavigation'
import { Route, Routes } from 'react-router-dom';
import { UserProfile } from './UserProfile';
import { Orders } from './Orders';
import { Address } from './Address';
import { Favorites } from './Favorites';
import { Events } from './Events';

export const Profile = () => {
  const [openSideBar, setOpenSidebar] = useState(false);
  return (
    <div className='lg:flex justify-between'>
        <div className='sticky h-[80vh] lg:w-[20%]'>
            <Profilenavigation/>
        </div>
        <div className='lg:w-[80%]'>
          <Routes>
            <Route path='/' element={<UserProfile/>}/>
            <Route path='/orders' element={<Orders/>}/>
            <Route path='/address' element={<Address/>}/>
            <Route path='/favorites' element={<Favorites/>}/>
            <Route path='/events' element={<Events/>}/>
          </Routes>

        </div>
    </div>
  )
}
