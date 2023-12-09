import React, { useEffect, useState } from 'react';

import './AuthModal.css';
import LoginForm from './LoginForm/LoginForm';
import SigininForm from './SigininForm/SigininForm';

const AuthModal = ({ isOpen, onClose }) => {
	const [isAuthTabActive, setIsAuthTabActive] = useState(false);

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

	const handleSigninTabClick = () => {
		console.log('111');
		setIsAuthTabActive(false);
	};

	const handleLoginTabClick = () => {
		console.log('222');
		setIsAuthTabActive(true);
	};

	return (
		<div
			className={`auth-modal ${isOpen && 'auth-modal_opened'}`}
			onClick={closeByOver}
		>
			<div className="auth-modal__btns">
				<button
					className={
						isAuthTabActive
							? 'auth-modal__active-btn'
							: 'auth-modal__inactive-btn auth-modal__inactive-btn_login'
					}
					onClick={handleLoginTabClick}
				>
					Авторизация
				</button>
				<button
					className={
						!isAuthTabActive
							? 'auth-modal__active-btn'
							: 'auth-modal__inactive-btn'
					}
					onClick={handleSigninTabClick}
				>
					Регистрация
				</button>
			</div>
			{isAuthTabActive ? (
				<LoginForm onClose={onClose} />
			) : (
				<SigininForm onClose={onClose} />
			)}
		</div>
	);
};

export default AuthModal;
