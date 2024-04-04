import './Button.css';

export default function Button({
  children,
  type,
  variant = 'dark',
  extraClass,
  relatedForm,
  disabled,
}) {
  return (
    <button
      type={type}
      className={`button ${
        variant !== 'dark' ? 'button_type_bright' : ''
      } ${extraClass}`}
      form={relatedForm}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
