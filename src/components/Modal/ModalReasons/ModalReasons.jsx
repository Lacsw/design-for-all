import React from 'react';

import './ModalReasons.css';
import { Modal } from 'components';
import deny from 'images/modals/deny-icon.svg';
import approve from 'images/modals/approve-icon.svg';

export default function ModalReasons({
  children,
  isOpen,
  onClose,
  title,
  rejFields,
}) {
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
            Подкатегория
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
            Заголовок статьи
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
            Картинка статьи
          </li>
          <li className="modal__reason">
            <img
              className="modal__reason-icon"
              src={rejFields.includes('description') ? deny : approve}
              alt={
                rejFields.includes('description')
                  ? 'Красный крестик'
                  : 'Зелёная галочка'
              }
            />
            Контент статьи
          </li>
          <li className="modal__reason">
            <img
              className="modal__reason-icon"
              src={
                rejFields.includes('recommend_from_creator') ? deny : approve
              }
              alt={
                rejFields.includes('recommend_from_creator')
                  ? 'Красный крестик'
                  : 'Зелёная галочка'
              }
            />
            Рекомендованые статьи
          </li>
        </ul>
      )}
      {children}
    </Modal>
  );
}
