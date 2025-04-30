import './ModalAttention.css';
import { Modal } from 'components';
import { useTranslation } from 'react-i18next';
import { CREATION } from 'utils/translationKeys';

export default function ModalAttention({ isOpen, onClose, title }) {
  const { t } = useTranslation();
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title} twoBtns large>
      <p className="modal-attention">
        {t(CREATION.NEW_ARTICLE_MODAL_ATTENTION_TEXT)}
      </p>    
    </Modal>
  );
}
