import { useState } from 'react';

import './Input.css';
import hideIcon from '../../images/pass-hide.svg';
import showIcon from '../../images/pass-show.svg';

export default function Input({
	children,
	type,
	value,
	placeholder,
	onChange,
	name,
	errors,
	required = false,
}) {
	const [visibility, setVisibility] = useState(type);
	const [hasFocus, setHasFocus] = useState(false);
	const validationClass = !errors && value ? 'input_valid' : 'input_error';

	function toggleInputVisibility() {
		setVisibility(visibility === 'password' ? 'text' : 'password');
	}

	function handleBlur({ target }) {
		target.value = target.value.trim();
		setHasFocus(true);
	}

	return (
		<div className={`input ${hasFocus ? validationClass : ''}`}>
			<input
				name={name}
				className="input__field"
				type={visibility}
				value={value}
				placeholder={placeholder}
				required={required}
				onChange={onChange}
				onBlur={handleBlur}
				autoComplete="off"
			/>
			{type === 'password' && (
				<img
					className="input__hide-icon"
					src={visibility === 'password' ? hideIcon : showIcon}
					alt="show/hide password"
					onClick={() => toggleInputVisibility()}
				/>
			)}
			{children}
		</div>
	);
}
