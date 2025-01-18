import { NodeViewWrapper } from '@tiptap/react';
import clsx from 'clsx';
import React from 'react';

export const ImageReactRTE = (props) => {
  console.log('ImageReactRTE props', props);
  return (
    <NodeViewWrapper
      className={clsx(
        props.extension.options.HTMLAttributes.class,
        props.node.attrs.class
      )}
    >
      <img src={props.node.attrs.src} alt="kittens" />

      {/* TODO labels for images */}
      {/* <NodeViewContent
        style={{ backgroundColor: 'red' }}
      /> */}
    </NodeViewWrapper>
  );
};
