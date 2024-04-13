import './Button.css';

export default function Button({
  children,
  type,
  theme = 'dark',
  extraClass,
  relatedForm,
  disabled,
  onClick,
}) {
  return (
    <button
      type={type}
      className={`button ${
        theme !== 'dark' ? 'button_type_bright' : ''
      } ${extraClass}`}
      form={relatedForm}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
