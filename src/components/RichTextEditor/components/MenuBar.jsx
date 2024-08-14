import { Children, memo } from 'react';

export const MenuBar = memo(({ children, editor, className }) => {
  if (!editor) {
    return null;
  }

  const childArray = Children.toArray(children);

  return (
    <ul className={`list rte__menu-bar ${className || ''}`}>
      {childArray.map((child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
  );
});
