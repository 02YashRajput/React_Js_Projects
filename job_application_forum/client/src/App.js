import './App.css';
import { Routes, Route } from'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileCompletionPage from './pages/ProfileCompletionPage';

function App() {



  

  return (<>
    <Routes>
      <Route path='/' element= {<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path='/sign-up' element= {<SignUp/>}/>
      <Route path="/profile-completion-page" element={<ProfileCompletionPage/>}/> 
      <Route path='*' element={<NotFound/>}/> 
    </Routes>
    {
      document.documentElement.classList.contains('dark')?(<ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"

        />
        ):(<ToastContainer/>)
    }
    </>
  );
}

export default App;
