// @ts-check
import { NodeViewWrapper } from '@tiptap/react';
import clsx from 'clsx';
import React from 'react';
import { getAligningClass } from './helpers';

/**
 * @param {import('@tiptap/react').NodeViewRendererProps} props
 * @returns {React.JSX.Element}
 */
export const ImageReactRTE = (props) => {
  // console.log(
  //   '%c REACT ',
  //   'background:rgb(34, 34, 34); color:rgb(85, 116, 218)',
  //   props
  // );
  return (
    <NodeViewWrapper
      className={clsx(
        props.extension.options.HTMLAttributes.class,
        getAligningClass(props.node.attrs.class)
      )}
    >
      <img src={props.node.attrs.src} />

      {/* TODO labels for images */}
      {/* <NodeViewContent
        style={{ backgroundColor: 'red' }}
      /> */}
    </NodeViewWrapper>
  );
};
