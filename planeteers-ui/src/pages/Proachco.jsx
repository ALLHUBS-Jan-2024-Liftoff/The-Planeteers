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

