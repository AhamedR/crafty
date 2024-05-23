import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Badge, Card, Col } from 'react-bootstrap'
import { useSession } from 'next-auth/react'
import Link from 'next/link'

import Craft from '@/models/Craft'
import Button from '@/components/atoms/Button'
import { addToCart } from '@/features/order/orderSlice'
import { useAppDispatch, useAppSelector } from '@/app/hooks'
import DeleteModal from '../templates/DeleteModal'
import { removeCraft } from '@/features/craft/craftSlice'
import notify from '@/helpers/toast'

interface Props {
  craft: Craft
  isEditable?: boolean
}

const CraftItem: React.FC<Props> = ({ craft, isEditable = true }) => {
  const router = useRouter()
  const dispatch = useAppDispatch()
  const { data: session } = useSession()
  const error = useAppSelector(state => state.craftSlice.error)
  const cart = useAppSelector(state => state.orderSlice.cart)
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false)
  const [countOnCart, setCountOnCart] = useState<number>(0)

  useEffect(() => {
    if (error) {
      notify(`Failed! - ${error}`, 'error')
    }
  }, [error])

  useEffect(() => {
    const cartData = cart.find((item) =>
      item.craftId === craft.id
    )

    setCountOnCart(cartData?.quantity ?? 0)
  }, [cart, craft.id])

  const handleAddToCart = () => {
    dispatch(addToCart({...craft, quantity: 1}))
  }

  const handleDelete = () => {
    setIsModalVisible(true)
  }

  const onDeleteConfirm = () => {
    craft?.id && session && dispatch(removeCraft(craft.id)).then((response) => {
      if (response.payload) {
        notify("Delete successful!")
        router.replace('/', undefined, { shallow: true })
      }
    })
    setIsModalVisible(false)
  }

  const onDeleteCancel = () => {
    setIsModalVisible(false)
  }

  return (
    <>
      <DeleteModal
        isModalVisible={isModalVisible}
        onConfirm={onDeleteConfirm}
        onCancel={onDeleteCancel}
      />
      <Col md={3} className='mt-3'>
        <Card>
          <Card.Img height={200} className="object-fit-cover" variant="top" src={craft.imageUrl} />
          <Card.Body>
            <Card.Subtitle>{craft.category}</Card.Subtitle>
            <Card.Title>{craft.title}</Card.Title>
            <Card.Text>Rs {craft.price.toFixed(2)}</Card.Text>
            {
              isEditable &&
              craft?.availableQuantity &&
              craft?.availableQuantity > 0 &&
              countOnCart < craft?.availableQuantity
                ? <Button variant='secondary' onClick={handleAddToCart}>Add to Cart</Button>
                : <Badge bg="secondary">Out of stock</Badge>
            }
          </Card.Body>
          {
            session && isEditable && (
              <Card.Footer>
                <Link href={`/craft/update/${craft.id}`}>
                  <Button variant="primary" className="me-2">Update</Button>
                </Link>
                <Button variant="danger" onClick={handleDelete}>Delete</Button>
              </Card.Footer>
            )
          }
        </Card>
      </Col>
    </>
  )}

export default CraftItem
