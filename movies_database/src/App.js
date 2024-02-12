import React, { useContext, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Home from './pages/Home';
import ParticularPage from './pages/ParticularPage';
import CategoryPage from './pages/CategoryPage';
import SearchPage from './pages/SearchPage';
import { AppContext } from './context/AppContext';
function App() {
  const {setName,setType} = useContext(AppContext)
  const location = useLocation(); 
  useEffect(()=>{
    if(location.pathname.split("/")[1]==="search"){
      setName(location.pathname.split("/")[2])
    }
    if(location.pathname.split("/")[1] === "category"){
      setType(location.pathname.split("/")[2])
    }
    // eslint-disable-next-line
  },[location.pathname])
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path='/:type/:id' element={<ParticularPage />} />
      <Route path='/search/:name' element={<SearchPage/>}/>
      <Route path='/category/:type' element={<CategoryPage />} />
    </Routes>
  );
}

export default App;