import { Container } from '@chakra-ui/layout'
import Content from './Content/Content'
import Sidebar from './Sidebar/Sidebar'
import Cover from './Cover'

export default function Main() {
  return (
    <div>
    <Cover />
    <Container display={{ base: 'block', md: 'flex' }} maxW="container.xl">
      <Sidebar />
      <Content />
    </Container>
    </div>
  )
}