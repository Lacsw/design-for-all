import './Button.css';

export default function Button({ children, type, relatedForm }) {
	return (
		<button type={type} className="button" form={relatedForm}>
			{children}
		</button>
	);
}
