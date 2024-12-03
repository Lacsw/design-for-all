import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import React from 'react';

export const ImageReactRTE = (props) => {
  console.log(props);
  return (
    <NodeViewWrapper className="react-component">
      <img
        src={props.node.attrs.src}
        width="100px"
        height="100px"
        alt="flowers"
      />

      {/* TODO labels for images */}
      {/* <NodeViewContent
        style={{ backgroundColor: 'red' }}
      /> */}
    </NodeViewWrapper>
  );
};
