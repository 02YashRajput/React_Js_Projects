import './App.css';
import{Routes,Route}from "react-router-dom"
import Home from './pages/Home';
import ParticularPage from './pages/ParticularPage';
function App() {

  
  

  return (
   <Routes>
     <Route path="/" element={<Home />} />
     <Route path='/:id' element={<ParticularPage/>}/>
   </Routes>
  );
}

export default App;
