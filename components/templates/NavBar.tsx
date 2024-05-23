import Link from 'next/link'
import { Navbar, Container } from 'react-bootstrap'

const NavbarComponent = () => {
  return (
    <Navbar bg="primary" variant="dark" expand="lg">
      <Container>
        <Link href="/">
          <Navbar.Brand>Crafty</Navbar.Brand>
        </Link>
      </Container>
    </Navbar>
  )
}

export default NavbarComponent
