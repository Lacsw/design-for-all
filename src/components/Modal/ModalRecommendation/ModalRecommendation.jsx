import './ModalRecommendation.css';

import { Input, Modal } from 'components';

export default function ModalRecommendation({ isOpen, onClose, title }) {
  return (
    <Modal title={title} onClose={onClose} isOpen={isOpen} twoBtns>
      <label className="modal-reccomendation__input">
        <span className="modal-reccomendation__input-span">Введите URL</span>
        {/* <Input type={'text'} value={'dprofile.ru/katyamorse'} /> */}
      </label>
    </Modal>
  );
}
