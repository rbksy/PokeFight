
import React from 'react'
import Navbar from '../components/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from '../components/Footer'


function Layout() {
  return (

    <>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      
    </>
  )
}

export default Layout