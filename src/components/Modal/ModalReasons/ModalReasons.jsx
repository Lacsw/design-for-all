import React from 'react';

import './ModalReasons.css';
import Modal from '../Modal';
import deny from '../../../images/modals/deny-icon.svg';
import approve from '../../../images/modals/approve-icon.svg';

export default function ModalReasons({ children, isOpen, onClose, title }) {
	return (
		<Modal large isOpen={isOpen} onClose={onClose} title={title}>
			<ul className="modal__reasons-list">
				<li className="modal__reason">
					<img className="modal__reason-icon" src={deny} alt="иконка отказа" />
					Подкатегория
				</li>
				<li className="modal__reason">
					<img
						className="modal__reason-icon"
						src={approve}
						alt="иконка подтверждения"
					/>
					Заголовок статьи
				</li>
				<li className="modal__reason">
					<img className="modal__reason-icon" src={deny} alt="иконка отказа" />
					Картинка статьи
				</li>
				<li className="modal__reason">
					<img className="modal__reason-icon" src={deny} alt="иконка отказа" />
					Контент статьи
				</li>
				<li className="modal__reason">
					<img className="modal__reason-icon" src={deny} alt="иконка отказа" />
					Рекомендованые статьи
				</li>
			</ul>
			<p className="modal__reason-text">{children}</p>
		</Modal>
	);
}
