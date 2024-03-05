import './Button.css';

export default function Button({ children, type, relatedForm, disabled }) {
	return (
		<button
			type={type}
			className="button"
			form={relatedForm}
			disabled={disabled}
		>
			{children}
		</button>
	);
}
