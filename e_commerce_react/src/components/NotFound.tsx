import React from 'react'
import Footer from './Footer'
import Header from './Header'
function NotFound() {
  return (
    <div className='relative dark:bg-slate-900  text-slate-500 flex flex-col justify-between min-h-screen'>
      <Header/>
        <div className='grow flex items-center justify-center text-4xl mt-24'>
          <h1>404 | Not Found Error  </h1>
        </div>
      <Footer/>
        
    </div>
  )
}

export default NotFound