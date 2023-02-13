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
        <form action="" className="add-sector-form">
            <div>
                <label for="sector-title">Title: </label>
                <input type="text" className="sector-title" />
            </div>
            <div>SLIDER INSERT</div>
            <div>
                <label for="sector-indicator">Indicator: </label>
                <input type="text" className="sector-indicator" />
            </div>
            <div>
                <label for="sector-target">target: </label>
                <input type="text" className="sector-target" />
            </div>
            <div>
                <label for="sector-description">description: </label>
                <input type="text" className="sector-description" />
            </div>
            <div>
                <label for="sector-cites">Citations: </label>
                <input type="text" className="sector-cites" />
            </div>
            <div>
                <label for="sector-videolink">Videolink: </label>
                <input type="url"  className="sector-videolink" />
            </div>
        </form>
    </ModalMenu>
  )
}
