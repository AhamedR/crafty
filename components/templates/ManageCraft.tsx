import { Row, Container, Col } from 'react-bootstrap'

import ICraft from '@/models/Craft'
import CraftForm from '@/components/templates/CraftForm'

interface IMangeCraftProps {
  onSubmit: (craft: ICraft) => void,
  craft?: ICraft,
}

const ManageCraft = ({ onSubmit, craft }: IMangeCraftProps) => {
  return (
    <Container className='mt-5 mb-5'>
      <Row>
        <Col>
          <h3>
            {
              craft
                ? `Update craft: ${craft?.title}`
                : 'Add new craft'
            }
          </h3>
        </Col>
      </Row>
      <CraftForm onSubmit={onSubmit} craft={craft}/>
    </Container>
  )
}

export default ManageCraft
