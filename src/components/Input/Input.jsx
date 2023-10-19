import './Input.css';

export default function Input({ children, type, value }) {
	return (
		<div className="input">
			<input className="input__field" type={type} value={value} />
			{children}
		</div>
	);
}
