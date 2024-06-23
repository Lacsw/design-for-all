import { Editor } from '@tiptap/react';
import React, { PropsWithChildren, memo } from 'react';

const MenuBar = ({ children, editor, className }) => {
  if (!editor) {
    return null;
  }

  const childArray = React.Children.toArray(children);

  return (
    <ul className={className ?? ''}>
      {childArray.map((child, index) => (
        <li key={index}>{child}</li>
      ))}
    </ul>
  );
};

export default memo(MenuBar);
