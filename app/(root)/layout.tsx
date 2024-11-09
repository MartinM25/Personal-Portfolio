import React from 'react'
import Navbar from "@/components/nav-bar";
import Footer from "@/components/footer";


const layout = ({ children }: { children: React.ReactNode}) => {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}

export default layout