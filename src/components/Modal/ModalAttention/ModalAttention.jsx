import './ModalAttention.css';
import { Modal } from 'components';

export default function ModalAttention({ isOpen, onClose, title }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} twoBtns large>
      <p className="modal-attention">
        Последние изменения не сохранены, сохранить в черновик?
      </p>
    </Modal>
  );
}
