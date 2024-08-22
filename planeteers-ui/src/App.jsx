import React from 'react';
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
import Navbar from './components/Navbar/index.jsx';
import Contact from './pages/Contact';
// import Comment from './pages/Comment';

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/gamepage" element={<GamePage />} />
      <Route path="/userprofile" element={<Userprofile />} />
      <Route path="/war" element={<GameOfWar />} />
      <Route path="/solitaire" element={<Solitaire />} />
      <Route path="/cardmatch" element={<CardMatch />} />
      <Route path="/blackjack" element={<Blackjack />} />
      <Route path="/comments" element={<Comment />} />
      <Route path="/contact" element={<Contact />} />
    </>
  )
);

function App() {
  return (
    <UserProvider>
           <Navbar />
           <RouterProvider router={router} />
    </UserProvider>
  );
}

export default App;
