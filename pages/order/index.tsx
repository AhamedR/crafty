import Head from 'next/head'
import { Container } from 'react-bootstrap'

import OrderForm from '@/components/templates/OrderForm'

const HomePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Order craft</title>
      </Head>
      <Container className='mt-5 mb-5'>
        <OrderForm/>
      </Container>
    </>
  )
}

export default HomePage
