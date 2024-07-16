import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Login } from './components/Users/Login'
import { Register } from './components/Users/Register'


function App() {
  const [currentForm, setCurrentForm] = useState('login')

  const toggleForm = (formFirstName, formLastName) => {
    setCurrentForm (formFirstName, formLastName);
  }

  return (
   <div className='App'>
    {
      currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
    }
   </div>
  );
}

export default App;
