import { ToastContainer } from 'react-toastify';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import { Routes, Route  } from'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>
      <Routes>
      <Route path="/" element={<Dashboard/>}/> 
      <Route path="/sign-up" element={<SignUp/>}/>
      <Route path = "/login" element = {<Login/>}/>
    
      <Route path='*' element={<NotFound/>}/> 
    </Routes>
    <ToastContainer/>
    </>
  );
}

export default App;
