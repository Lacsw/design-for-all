import { NodeViewContent, NodeViewWrapper } from '@tiptap/react';
import React from 'react';

export const ImageReactRTE = (props) => {
  console.log(props);
  return (
    <NodeViewWrapper className="react-component">
      <label contentEditable={false}>React Component</label>
      <img
        src={props.node.attrs.src}
        width="100px"
        height="100px"
        alt="flowers"
      />

      <NodeViewContent className="content is-editable" />
    </NodeViewWrapper>
  );
};
