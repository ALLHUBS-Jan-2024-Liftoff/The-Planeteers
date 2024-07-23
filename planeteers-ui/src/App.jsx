import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Login } from './components/Users/Login'
import { Register } from './components/Users/Register'
import Home from './pages/Home'
import { BrowserRouter, Routes, Route} from "react-router-dom";
function App() {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formFirstName, formLastName) => {
    setCurrentForm (formFirstName, formLastName);
  }

  return (
       <div className='App'>
            <BrowserRouter>
                <Routes>
                    <Route index element={<Login />} />
                    <Route path ="/login"  element={<Login />} />
                    <Route path ="/register"  element={<Register />} />
                    <Route path ="/home"  element={<Home />} />

                </Routes>
            </BrowserRouter>
       </div>
  );
}

export default App;
