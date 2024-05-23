import { Container, Row, Col, Alert } from 'react-bootstrap'
import { useRouter } from 'next/router'

const ErrorSplash = () => {
  const router = useRouter()

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Alert variant="danger">
            <h4>Error</h4>
            <p>{router.query.message}</p>
          </Alert>
        </Col>
      </Row>
    </Container>
  )
}

export default ErrorSplash
