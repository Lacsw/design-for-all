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
}) {
	const [visibility, setVisibility] = useState(type);

	function toggleInputVisibility() {
		setVisibility(visibility === 'password' ? 'text' : 'password');
	}

	return (
		<div className="input">
			<input
				className="input__field"
				type={visibility}
				value={value}
				placeholder={placeholder}
				onChange={onChange}
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
