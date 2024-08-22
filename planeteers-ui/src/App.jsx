import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 
import './App.css'
import { Login } from './components/Users/Login'
import { Register } from './components/Users/Register'
import Home from './pages/Home'
import GamePage  from './pages/GamePage'
import Blackjack  from './pages/Blackjack'
import CardMatch  from './pages/CardMatch'
import GameOfWar  from './pages/War'
import Solitaire  from './pages/Solitaire'
import Userprofile from './pages/Userprofile'
import Navbar from './components/Navbar/index.jsx';
import Contact from './pages/Contact'



export default function App() {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formFirstName, formLastName) => {
    setCurrentForm (formFirstName, formLastName);
  }

  return (
       <div className='App'>
            <Router>
                <Navbar />
                <Routes>
                  <Route index element={<Login />} />
                  <Route path ="/login"  element={<Login />} />
                  <Route path ="/register"  element={<Register />} />
                  <Route path ="/home"  element={<Home />} />
                  <Route path ="/gamepage"  element={<GamePage />} />
                  <Route path ="/Userprofile"  element={<Userprofile />} />
                  <Route path ="/war"  element={<GameOfWar />} />
                  <Route path ="/solitaire"  element={<Solitaire />} />
                  <Route path ="/cardmatch"  element={<CardMatch />} />
                  <Route path ="/blackjack"  element={<Blackjack />} /> 
                  <Route path ="/comments"  element={<Comment/>} /> 
                  <Route path ="/contact"  element={<Contact />} />
                </Routes>
            </Router>
       </div>
  );
}


