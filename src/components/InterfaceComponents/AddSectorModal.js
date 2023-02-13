import React from 'react'
import ModalMenu from './ModalMenu'

export default function AddSectorModal(props) {
    const [isShowingModal, setShowingModal] = useState(false);

  return (
    <ModalMenu 
        isShow={isShowingModal}
        onClose={() => setShowingModal(false)}
        onSave={() => setShowingModal(false)} // TODO: onSave function to pass data from Modal
        title="Modal Title"
    >
        <form action="">

        </form>
    </ModalMenu>
  )
}
