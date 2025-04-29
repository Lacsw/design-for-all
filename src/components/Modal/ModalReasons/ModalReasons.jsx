import React from 'react';

import './ModalReasons.css';
import { Modal } from 'components';
import deny from 'images/modals/deny-icon.svg';
import approve from 'images/modals/approve-icon.svg';
import { useTranslation } from 'react-i18next';
import { ARTICLE } from 'utils/translationKeys';

export default function ModalReasons({
  children,
  isOpen,
  onClose,
  title,
  rejFields,
}) {
  const { t } = useTranslation();
  return (
    <Modal large isOpen={isOpen} onConfirm={onClose} title={title}>
      {rejFields && (
        <ul className="modal__reasons-list">
          <li className="modal__reason">
            <img
              className="modal__reason-icon"
              src={rejFields.includes('sub_category') ? deny : approve}
              alt={
                rejFields.includes('sub_category')
                  ? 'Красный крестик'
                  : 'Зелёная галочка'
              }
            />
            {t(ARTICLE.MODAL_REASONS.SUB_CATEGORY)}
          </li>
          <li className="modal__reason">
            <img
              className="modal__reason-icon"
              src={rejFields.includes('title') ? deny : approve}
              alt={
                rejFields.includes('title')
                  ? 'Красный крестик'
                  : 'Зелёная галочка'
              }
            />
            {t(ARTICLE.MODAL_REASONS.TITLE)}
          </li>
          <li className="modal__reason">
            <img
              className="modal__reason-icon"
              src={rejFields.includes('image') ? deny : approve}
              alt={
                rejFields.includes('image')
                  ? 'Красный крестик'
                  : 'Зелёная галочка'
              }
            />
            {t(ARTICLE.MODAL_REASONS.IMAGE)}
          </li>
          <li className="modal__reason">
            <img
              className="modal__reason-icon"
              src={rejFields.includes('description') ? deny : approve}
              alt={
                rejFields.includes('description')
                  ? t(ARTICLE.MODAL_REASONS.DESCRIPTION_DENY)
                  : t(ARTICLE.MODAL_REASONS.DESCRIPTION_APPROVE)
              }
            />
              {t(ARTICLE.MODAL_REASONS.DESCRIPTION)}
          </li>
          <li className="modal__reason">
            <img
              className="modal__reason-icon"
              src={
                rejFields.includes('recommend_from_creator') ? deny : approve
              }
              alt={
                rejFields.includes('recommend_from_creator')
                  ? t(ARTICLE.MODAL_REASONS.RECOMMENDATIONS_DENY)
                  : t(ARTICLE.MODAL_REASONS.RECOMMENDATIONS_APPROVE)
              }
            />
            {t(ARTICLE.MODAL_REASONS.RECOMMENDATIONS)}
          </li>
        </ul>
      )}
      {children}
    </Modal>
  );
}
