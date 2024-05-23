import { render } from '@testing-library/react'
import '@testing-library/jest-dom'

import DeleteModal from '@/components/templates/DeleteModal'

describe('Modal', () => {
  it('renders Delete modal', () => {
    const component = render(
      <DeleteModal
        isModalVisible={true}
        onConfirm= {() => {return}}
        onCancel= {() => {return}}
      />
    )

    expect(component).toMatchSnapshot()
  })
})
