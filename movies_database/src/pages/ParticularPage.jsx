import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import { useLocation } from 'react-router-dom'
import Loading from '../components/Loading'
import Particular from '../components/Particular'
import Category from '../components/Category'
import Header from '../components/Header'
import Footer from '../components/Footer'

const ParticularPage = () => {
  const {fetchData,apiKey,} = useContext(AppContext)
  const [pageData,setPageData] = useState({})
  const location = useLocation()
  const [loading , setLoading] = useState(true);
  useEffect(()=>{
    fetching()
     // eslint-disable-next-line 
  },[location.pathname])
  async function fetching(){
    
    setLoading(true)
    const url = `https://api.themoviedb.org/3${location.pathname}?api_key=${apiKey}`
    await fetchData(url,setPageData)
    setLoading(false)
    
  }
  
  return (

    <div className='dark:bg-slate-900 min-h-screen'>
      <Header/>
      {loading ? <Loading/>:(<div className='px-10 py-28 text-slate-500 dark:bg-slate-900'>
      <Particular pageData ={pageData} type={location.pathname.split("/")[1]} />
      <Category value = {pageData} />
    </div>)}
    <Footer/></div>
  )
}

export default ParticularPage