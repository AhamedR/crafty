import { useEffect, useState } from 'react'
import { Form, Row, Container, Col } from 'react-bootstrap'

import Button from '@/components/atoms/Button'
import Input from '@/components/atoms/Input'
import Select from '@/components/atoms/Select'
import ICraft from '@/models/Craft'
import { validateCraft } from '@/helpers/validateForms'

interface ICraftFormProps {
  onSubmit: (craft: ICraft) => void,
  craft?: ICraft,
}

const craftCategory = [
  {label: 'Ceramics and glass crafts', value: 'Ceramics and glass crafts'},
  {label: 'Fibre and textile crafts', value: 'Fibre and textile crafts'},
  {label: 'Flower crafts', value: 'Flower crafts'},
  {label: 'Fashion', value: 'Fashion'},
  {label: 'Needlework', value: 'Needlework'},
  {label: 'Paper crafts', value: 'Paper crafts'},
  {label: 'Wood and furniture crafts', value: 'Wood and furniture crafts'},
  {label: 'Stone crafts', value: 'Stone crafts'},
  {label: 'Metal crafts', value: 'Metal crafts'}
]

const CraftForm = ({ onSubmit, craft }: ICraftFormProps) => {
  const [validationResult, setValidationResult] = useState<string[]>([])
  const [isSubmitted, setIsSubmitted] = useState(false)

  const [title, setTitle] = useState(craft?.title ?? '')
  const [description, setDescription] = useState(craft?.description ?? '')
  const [category, setCategory] = useState(craft?.category ?? 'Fashion')
  const [price, setPrice] = useState(craft?.price ?? 0)
  const [imageUrl, setImageUrl] = useState(craft?.imageUrl ?? '')
  const [availableQuantity, setAvailableQuantity] = useState(craft?.availableQuantity ?? 0)

  useEffect(() => {
    const errors = validateCraft({
      title,
      description,
      category,
      price,
      imageUrl,
      availableQuantity,
    })

    isSubmitted && setValidationResult(errors)
  }, [title, description, category, price, imageUrl, availableQuantity, isSubmitted])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const cewCraft: ICraft = {
      title,
      description,
      category,
      price,
      imageUrl,
      availableQuantity,
    }

    const errors = validateCraft(cewCraft)

    if (errors.length === 0) {
      onSubmit(cewCraft)
    } else {
      setValidationResult(errors)
    }

    setIsSubmitted(true)
  }

  const isFormValid = (inputName: string): boolean =>
    !!validationResult.find(result => result === inputName)

  return (
    <Form noValidate validated={false} className="mt-5" onSubmit={handleSubmit}>
      <Container >
        <Row className="mb-3">
          <Col md={{ span: 4, offset: 4 }}>
            <Input
              type='text'
              label='Title'
              placeholder='Enter Title'
              value={title}
              onChange={(value) => setTitle(value)}
              isInvalid={isFormValid('title')}
            />
            <Input
              type='text'
              label='Description'
              placeholder='Enter Description'
              value={description}
              onChange={(value) => setDescription(value)}
              isInvalid={isFormValid('description')}
            />
            <Input
              type='number'
              label='Price'
              placeholder='Enter price'
              value={price.toString()}
              onChange={(value) => setPrice(parseFloat(value))}
              isInvalid={isFormValid('price')}
            />
            <Input
              type='number'
              label='Available quantity'
              placeholder='Enter available quantity'
              value={availableQuantity.toString()}
              onChange={(value) => setAvailableQuantity(parseFloat(value))}
              isInvalid={isFormValid('availableQuantity')}
            />
            <Select
              label='Category'
              onChange={(value) => setCategory(value)}
              options={craftCategory}
              value={category}
            />
            <Input
              type='url'
              label='Craft Image url'
              placeholder='Enter image URL'
              value={imageUrl}
              onChange={(value) => setImageUrl(value)}
              isInvalid={isFormValid('imageUrl')}
            />
            <Button variant="primary" type="submit">
              {craft ? 'Update' : 'Submit'}
            </Button>
          </Col>
        </Row>
      </Container>
    </Form>
  )
}

export default CraftForm
