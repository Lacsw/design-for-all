import React, { useEffect } from 'react';

import './Modal.css';
import confirmBtn from '../../images/modals/confirm-btn.png';
import cancelBtn from '../../images/modals/cancel-btn.png';

const Modal = ({ children, isOpen, onClose, title, large, twoBtns }) => {
	useEffect(() => {
		if (isOpen) {
			const closeByEsc = (evt) => {
				if (evt.key === 'Escape') {
					onClose();
				}
			};
			document.addEventListener('keydown', closeByEsc);
			return () => document.removeEventListener('keydown', closeByEsc);
		}
	}, [isOpen, onClose]);

	const closeByOver = (evt) => {
		if (evt.target.classList.contains('modal')) {
			onClose();
		}
	};

	return (
		<div className={`modal ${isOpen && 'modal_opened'}`} onClick={closeByOver}>
			<div
				className="modal__container"
				style={{
					padding: large ? '30px' : '20px',
					gap: large ? '20px' : '15px',
				}}
			>
				<h2
					className="modal__title"
					style={{
						fontSize: large ? '28px' : '18px',
						fontWeight: large ? '700' : '400',
					}}
				>
					{title}
				</h2>

				{children}

				<div className="modal__btns">
					<button
						onClick={onClose}
						className="modal__confirm-btn"
						type="button"
						aria-label="кнопка подтверждения"
					>
						<img
							src={confirmBtn}
							alt="подтвердить"
							className="modal__btn-img"
						/>
					</button>
					{twoBtns && (
						<button
							onClick={onClose}
							className="modal__confirm-btn"
							type="button"
							aria-label="кнопка закрытия"
						>
							<img src={cancelBtn} alt="закрыть" className="modal__btn-img" />
						</button>
					)}
				</div>
			</div>
		</div>
	);
};

export default Modal;
