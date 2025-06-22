// @ts-check
/* eslint-disable jsx-a11y/alt-text */

// eslint-disable-next-line no-unused-vars
import { NodeViewWrapper } from '@tiptap/react';
import clsx from 'clsx';
import React from 'react';
import { getAligningClass } from './helpers';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { tiptapCommands } from 'components/RichTextEditor/helpers';

/**
 * @param {import('@tiptap/react').NodeViewRendererProps} props
 * @returns {React.JSX.Element}
 *
 *   При вставке **новой** кастомной ноды изображения\
 *   (см. {@link tiptapCommands}) вызов метода parseHTML -> getAttrs (`#1`)\
 *   не происходит, потому необходимо внутри NodeView подтягиваться\
 *   стандартные классы, задаваемые при конфигурировании расширения.
 *
 *   При загрузке статьи с уже имеющимися в теле статьи нод картинок\
 *   происходит парсинг этих нод, потому вызов `#1` уже происходит.
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

      {/* <NodeViewContent>Ahaha</NodeViewContent> */}
    </NodeViewWrapper>
  );
};
