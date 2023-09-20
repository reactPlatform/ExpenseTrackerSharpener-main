import {BrowserRouter,Routes,Route} from 'react-router-dom';
import './styles/App.css';
import Home from './components/Home';
import RegisterForm from './components/registerForm';
import Loginfiller from './components/loginForm';
import ForgotPassword from './components/forgotPassword';
import ProfileUpdate from './components/profileUpdate';
import { useSelector } from 'react-redux';
function App() {
  const isDarkMode = useSelector(state => state.theme.isDarkMode);
  return (
    <BrowserRouter>
    <div className={isDarkMode ? 'App darkTheme' : 'App'}>
      <Routes>
        <Route path='/' element={<Loginfiller />}/>
        <Route path='/home' element={<Home />}/>
        <Route path='/signup' element={<RegisterForm />}/>
        <Route path='/forgotPassword' element={<ForgotPassword />}/>
        <Route path='/updateProfile' element={<ProfileUpdate />}/>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
