import { useState } from 'react';
import Input from '../../Input/Input';

export default function LoginForm({ onClose }) {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');

	const handleSubmit = (evt) => {
		evt.preventDefault();
		onClose();
	};

	const isFormValid = email && password;

	return (
		<form className="auth-modal__container">
			<label className="auth-modal__field">
				Логин
				<Input
					type="email"
					className="auth-modal__input"
					placeholder="Логин"
					value={email}
					onChange={(evt) => setEmail(evt.target.value)}
				/>
			</label>

			<label className="auth-modal__field">
				Пароль
				<Input
					type="password"
					className="auth-modal__input"
					placeholder="Пароль"
					value={password}
					onChange={(evt) => setPassword(evt.target.value)}
				/>
			</label>

			<button
				onClick={handleSubmit}
				className={`auth-modal__main-btn ${
					isFormValid ? 'auth-modal__main-btn_active' : ''
				}`}
				type="submit"
				aria-label="кнопка входа"
				disabled={!isFormValid}
			>
				Войти
			</button>
		</form>
	);
}
