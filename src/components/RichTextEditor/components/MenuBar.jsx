import { Children, memo } from 'react';

export const MenuBar = memo(({ children, editor }) => {
  if (!editor) {
    return null;
  }

  const childArray = Children.toArray(children);

  return (
    <ul className="list rte__menu-bar">
      {childArray.map((child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
  );
});
