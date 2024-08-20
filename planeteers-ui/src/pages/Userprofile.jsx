import SimpleBar from 'simplebar-react'
import { ChakraProvider } from '@chakra-ui/react'
import { theme } from '../helpers/index.js'
import Main from '../components/Main.jsx'


export default function Userprofile() {
  return (
    <SimpleBar style={{ maxHeight: '100vh' }}>
      <ChakraProvider theme={theme}>
            <Main />
      </ChakraProvider>
    </SimpleBar>
 )
}

