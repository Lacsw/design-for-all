import React, { useEffect, useState } from 'react';

import './AuthModal.css';
import plusIcon from '../../images/plus-icon.svg';

const AuthModal = ({ isOpen, onClose }) => {
	const [isAuthTabActive, setIsAuthTabActive] = useState(true);

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

	const handleSubmit = (evt) => {
		evt.preventDefault();
		onClose();
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
				<form className="auth-modal__container">
					<label className="auth-modal__field">
						Логин
						<input
							type="email"
							className="auth-modal__input"
							placeholder="Логин"
						/>
					</label>

					<label className="auth-modal__field">
						Пароль
						<input
							type="password"
							className="auth-modal__input"
							placeholder="Пароль"
						/>
					</label>

					<button
						onClick={handleSubmit}
						className="auth-modal__main-btn"
						type="submit"
						aria-label="кнопка входа"
					>
						Войти
					</button>
				</form>
			) : (
				<form className="auth-modal__container auth-modal__container_signin">
					<label className="auth-modal__field">
						*Email
						<input
							type="Email"
							className="auth-modal__input"
							placeholder="email"
						/>
					</label>

					<label className="auth-modal__field">
						*Ссылки на ваши проекты
						<div className="auth-modal__input-projects">
							<input
								type="url"
								className="auth-modal__input"
								placeholder="Ссылка на проект"
							/>
							<button className="auth-modal__input-projects-btn">
								<img src={plusIcon} alt="добавить проект" />
							</button>
						</div>
					</label>

					<p className="auth-modal__politics">
						Нажимая кнопку «Зарегистрироваться» вы:
						<br /> Даете право на обработку{' '}
						<a href="personal" className="auth-modal__politics-link">
							персональных данных
						</a>{' '}
						Соглашаетесь с{' '}
						<a href="terms-of-service" className="auth-modal__politics-link">
							пользовательским соглашением
						</a>
					</p>

					<button
						onClick={handleSubmit}
						className="auth-modal__main-btn"
						type="submit"
						aria-label="кнопка входа"
					>
						Регистрация
					</button>
				</form>
			)}
		</div>
	);
};

export default AuthModal;
