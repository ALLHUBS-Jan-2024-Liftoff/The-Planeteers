// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import { Login } from './components/Users/Login'
// import { Register } from './components/Users/Register'


// export default function App() {
//   const [currentForm, setCurrentForm] = useState('login')

//   const toggleForm = (formFirstName, formLastName) => {
//     setCurrentForm (formFirstName, formLastName);
//   }

//   return (
//    <div className='App'>
//     {
//       currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch={toggleForm}/>
//     }
//    </div>
//   );q

  

import SimpleBar from 'simplebar-react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../helpers/index.js'
import Main from '../components/Main.jsx'


export default function Proachco() {
  return (
    <SimpleBar style={{ maxHeight: '100vh' }}>
      <ChakraProvider theme={theme}>
        <Router>
          <Routes>
            <Route path='/' element={<Main/>} />
          </Routes>
        </Router>
      </ChakraProvider>
    </SimpleBar>
 )
}

