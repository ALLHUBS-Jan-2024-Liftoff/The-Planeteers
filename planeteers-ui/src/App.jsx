import React, { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';
import { UserProvider } from './UserContext.jsx'; 
import './App.css';
import { Login } from './components/Users/Login';
import { Register } from './components/Users/Register';
import Home from './pages/Home';
import GamePage from './pages/GamePage';
import Blackjack from './pages/Blackjack';
import CardMatch from './pages/CardMatch';
import GameOfWar from './pages/War';
import Solitaire from './pages/Solitaire';
import Userprofile from './pages/Userprofile';
import Contact from './pages/Contact';
import Layout from './Layout';
import Navbar from './components/Navbar/index.jsx';
// import Comment from './pages/Comment';



function App() {
  const [currentUser, setCurrentUser] = useState(null)
  useEffect(()=>{
    const storedUser = localStorage.getItem("user");
    if (storedUser){
      setCurrentUser(JSON.parse(storedUser))
    }
    
    },[])

console.log("current user ",localStorage.getItem("user"))
console.log("current user name ", currentUser?.name)

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login setCurrentUser={setCurrentUser} />} />
    <Route path="/register" element={<Register setCurrentUser={setCurrentUser} />} />
    <Route element={<Layout />}>
    <Route path="/navbar" element={<Navbar currentUser={currentUser}/>} />
      <Route path="/home" element={<Home />} />
      <Route path="/gamepage" element={<GamePage />} />
      <Route path="/userprofile" element={<Userprofile currentUser={currentUser} />} />
      <Route path="/war" element={<GameOfWar currentUser={currentUser}/>} />
      <Route path="/solitaire" element={<Solitaire />} />
      <Route path="/cardmatch" element={<CardMatch />} />
      <Route path="/blackjack" element={<Blackjack />} />
      <Route path="/comments" element={<Comment currentUser={currentUser} />} />
      <Route path="/contact" element={<Contact />} />
    </Route>
  </>
  )
);

return (
  <UserProvider>
    <RouterProvider router={router} />
  </UserProvider>
);
}

export default App;