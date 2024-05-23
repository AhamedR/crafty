import { useEffect, useState } from 'react'
import { Button, Modal as BModal } from 'react-bootstrap'

type VariantType = 'primary' | 'danger'

interface ConfirmationModalProps {
  title: string
  message: string
  confirmBtnText: string
  isModalVisible: boolean
  variant: VariantType,
  onConfirm: () => void
  onCancel: () => void
}

const Modal = ({ isModalVisible, title, message, confirmBtnText, variant='primary', onConfirm, onCancel }: ConfirmationModalProps) => {
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    setShowModal(isModalVisible)
  }, [isModalVisible])

  const handleConfirm = () => {
    onConfirm()
    setShowModal(false)
  }

  const handleCancel = () => {
    onCancel()
    setShowModal(false)
  }

  return (
    <BModal show={showModal} onHide={() => handleCancel()}>
      <BModal.Header closeButton>
        <BModal.Title>{title}</BModal.Title>
      </BModal.Header>
      <BModal.Body>{message}</BModal.Body>
      <BModal.Footer>
        <Button variant="secondary" onClick={() => handleCancel()}>
          Cancel
        </Button>
        <Button variant={variant} onClick={handleConfirm}>
          {confirmBtnText}
        </Button>
      </BModal.Footer>
    </BModal>
  )
}

export default Modal
