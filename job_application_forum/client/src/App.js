import './App.css';
import { Routes, Route } from'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import SignUp from './pages/SignUp';
import Logout from './pages/Logout';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProfileCompletionPage from './pages/ProfileCompletionPage';
import { useNavigate , useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Profile from './pages/Profile';
import ContactUs from './pages/ContactUs';
import Applicant from './pages/Applicant';
import Jobs from './pages/Jobs';
import Portfolio from './pages/Portfolio';
import ViewDetails from './pages/ViewDetails';
function App() {
  const paths = ['/dashboard','/profile-completion-page','/contact-us',"/applicant","/jobs" ,'/portfolio',"/view-details",'/profile']
  const location = useLocation();
  const navigate = useNavigate();
  useEffect(()=>{
    if(paths.includes(location.pathname)){

      fetchData();
    }
    if(location.pathname === "/"){
      navigate("/dashboard");
    }
  // eslint-disable-next-line
  },[location.pathname]);

  const fetchData = async()=>{
    const response = await fetch(`/api/`);
    const data = await response.json();
    console.log(data);
    if(data.msg ==="user not found" ){
      navigate('/login')
    }
    else{
      navigate(`${location.pathname}?userType=${data.userType}`)
    }

  }


  

  return (<>
    <Routes>
      <Route path='/dashboard' element= {<Home />}/>
      <Route path="/login" element={<Login />}/>
      <Route path='/sign-up' element= {<SignUp/>}/>
      <Route path="/contact-us" element= {<ContactUs/>}/>
      <Route path='/logout' element={<Logout/>}/>
      <Route path="/profile-completion-page" element={<ProfileCompletionPage/>}/> 
      <Route path="/applicant" element={<Applicant/>}/>
      <Route path="/jobs" element= {<Jobs/>}/>
      <Route path='/portfolio' element={<Portfolio/>}/>
      <Route path="/view-details" element={<ViewDetails/>}/>
      <Route path="/profile" element= {<Profile/>}/> 
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
