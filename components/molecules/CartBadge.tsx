import { Badge } from 'react-bootstrap'
import { FaShoppingCart } from 'react-icons/fa'
import Link from 'next/link'

import Button from '@/components/atoms/Button'
import { useAppSelector } from '@/app/hooks'

const CartBadge: React.FC = () => {
  const totalOrder = useAppSelector(state => state.orderSlice.totalOrder)

  return (
    <Link href="/order">
      <Button className="pull-right" disabled={totalOrder <= 0}>
        <h4><FaShoppingCart/></h4>
        <strong>{totalOrder.toFixed(2)}</strong><br/>
        <Badge bg="primary">Checkout</Badge>
      </Button>
    </Link>
  )
}

export default CartBadge
