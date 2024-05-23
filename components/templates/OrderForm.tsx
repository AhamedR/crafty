import { useEffect, useState } from 'react'
import { Container, Form, Card, Row, Col } from 'react-bootstrap'
import { useRouter } from 'next/router'

import Button from '@/components/atoms/Button'
import Input from '../atoms/Input'
import { validateOrder } from '@/helpers/validateForms'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import { placeOrder } from '@/features/order/orderSlice'
import ICustomer from '@/models/Customer'
import notify from '@/helpers/toast'

const OrderForm = () => {
  const [validationResult, setValidationResult] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const router = useRouter()
  const dispatch = useAppDispatch()
  const cart = useAppSelector(state => state.orderSlice.cart)
  const total = useAppSelector(state => state.orderSlice.totalOrder)
  const error = useAppSelector(state => state.craftSlice.error)

  const [formData, setFormData] = useState<ICustomer>({
    customerName: '',
    address: '',
    contact: '',
  })

  useEffect(() => {
    const errors = validateOrder(formData)

    isSubmitted && setValidationResult(errors)
  }, [formData, isSubmitted])

  const handleChange = (customerName: string, value: string) => {
    setFormData({ ...formData, [customerName]: value })
  }

  useEffect(() => {
    if (error) {
      notify(`Failed! - ${error}`, 'error')
    }
  }, [error, router])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitted(true)
    const errors = validateOrder(formData)

    if (errors.length === 0) {
      dispatch(placeOrder(formData))
      .then((response) => {
        if (response.payload) {
          notify("Order placed successful!")
          router.replace('/', undefined, { shallow: true })
        }
      })
    }
  }

  const isFormValid = (inputName: string): boolean =>
  !!validationResult.find(result => result === inputName)

  return (
    <Container>
      <Row>
        <h2 className="mb-5">Place your order</h2>
        <Col md={{ span: 5, offset: 1 }}>
          <h4>Cart Items</h4>
          {cart.map((item) => (
            <Card key={item.craftId} className='mt-2'>
              <Row>
                <Col md={3}>
                  <Card.Img src={item.imageUrl} alt={item.title} />
                </Col>
                <Col md={9}>
                  <Card.Body>
                    <Card.Title>{item.title}</Card.Title>
                    <Card.Text>
                      Price: {item.quantity} x {item.price}
                    </Card.Text>
                  </Card.Body>
                </Col>
              </Row>
            </Card>
          ))}
          <p className="mt-3">Total order: Rs {total.toFixed(2)}</p>
        </Col>
        <Col md={{ span: 5, offset: 1 }}>
          <h4>Customer Information</h4>
          <Form onSubmit={handleSubmit}>
            <Input
              type='text'
              label='Full Name'
              placeholder='Enter full name'
              value={formData.customerName}
              onChange={(value) => handleChange('customerName', value)}
              isInvalid={isFormValid('customerName')}
            />
            <Input
              type='text'
              label='Address'
              placeholder='Enter address'
              value={formData.address}
              onChange={(value) => handleChange('address', value)}
              isInvalid={isFormValid('address')}
            />
            <Input
              type='text'
              label='Contact number'
              placeholder='Enter contact number'
              value={formData.contact}
              onChange={(value) => handleChange('contact', value)}
              isInvalid={isFormValid('contact')}
            />
            <Button className="mt-2" variant="primary" type="submit" disabled={cart.length <= 0}>
              Place Order
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  )
}

export default OrderForm
