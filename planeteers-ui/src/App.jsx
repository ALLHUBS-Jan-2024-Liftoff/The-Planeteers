import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Login } from './components/Users/Login'
import { Register } from './components/Users/Register'
import SimpleBar from 'simplebar-react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from 'helpers'
import Cover from 'components/Cover'
import Main from 'components/Main'


export default function App() {
  return (
    <SimpleBar style={{ maxHeight: '100vh' }}>
      <ChakraProvider theme={theme}>
        <Router>
          <Switch>
            <Route path="/" exact>
              <Cover />
              <Main />
            </Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </SimpleBar>
  )
}

