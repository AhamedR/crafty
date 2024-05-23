import Modal from '@/components/molecules/Modal'

interface DeleteModalProps {
  isModalVisible: boolean
  onConfirm: () => void
  onCancel: () => void
}

const DeleteModal = ({onConfirm, onCancel, isModalVisible}: DeleteModalProps) =>
  <Modal
    isModalVisible={isModalVisible}
    title="Confirm Delete"
    message="Are you sure you want to delete this craft?"
    confirmBtnText="Delete"
    variant="danger"
    onConfirm={onConfirm}
    onCancel={onCancel}
  />

export default DeleteModal
