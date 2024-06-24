// TODO разобраться, почему Еслинт не видит модули
// eslint-disable-next-line import/no-unresolved
import Placeholder from '@tiptap/extension-placeholder';
// eslint-disable-next-line import/no-unresolved
import TextAlign from '@tiptap/extension-text-align';
// eslint-disable-next-line import/no-unresolved
import StarterKit from '@tiptap/starter-kit';
// eslint-disable-next-line import/no-unresolved
import { EditorContent, useEditor } from '@tiptap/react';
// icons
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import DataObjectIcon from '@mui/icons-material/DataObject';
import CodeIcon from '@mui/icons-material/Code';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
// --- --- --- ---
import { Divider } from '@mui/material';
import React, { memo, useEffect, useRef, useState } from 'react';

import { MenuBar, RteButton } from './components';
import { validate } from './validators';
import { commandsNames } from './helpers';
import './index.css';

const defaultValidationsOptions = {
  kinds: {},
  mode: 'check',
};

// Для тестов
// let mockContent = "";
// const mockArr: string[] = [];
// for (let i = 0; i < 1010; i++) {
//     mockArr.push(`<p>Item ${i}.</p>`);
// }
// mockContent = mockArr.join("");

/** Богатый текстовый редактор */
export const RichTextEditor = memo(function RichTextEditor({
  initialValue = null,
  validationsOptions,
  onInput,
  readOnly = false,
  className,
  cancel,
  maxHeight = 'auto',
}) {
  console.log('render Tiptap');
  const extensions = [
    StarterKit.configure({
      blockquote: false,
      horizontalRule: false,
      strike: false,
      bulletList: {
        HTMLAttributes: {
          class: 'rte__node rte__node_bullet-list',
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: 'rte__node rte__node_ordered-list',
        },
      },
      code: {
        HTMLAttributes: {
          class: 'rte__node rte__node_code',
        },
      },
      codeBlock: {
        HTMLAttributes: {
          class: 'rte__node rte__node_code rte__node_code-block',
        },
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Placeholder.configure({
      placeholder: 'Введите текст',
    }),
  ];

  // Объединение заданных настроек с настройками по умолчанию
  // TODO найти или реализовать deep-merge
  let _validationsOptions = {};
  if (validationsOptions) {
    Object.assign(
      _validationsOptions,
      defaultValidationsOptions,
      validationsOptions
    );
    _validationsOptions.kinds = Object.assign(
      {},
      defaultValidationsOptions.kinds,
      validationsOptions.kinds
    );
  } else {
    _validationsOptions = undefined;
  }

  const wrapperRef = useRef(null);
  const [inFocusWithin, setInFocusWithin] = useState(false);

  const onUpdate = ({ editor, transaction }) => {
    // Передаём данные о вводе в родителя
    if (onInput) {
      const htmlString = editor.getHTML();
      if (_validationsOptions) {
        const result = validate(_validationsOptions, editor);
        onInput(result);
      } else {
        onInput({ validity: { isValid: true }, content: htmlString });
      }
    }
  };

  const editor = useEditor({
    extensions,
    // content: mockContent,
    content: initialValue,
    editable: !readOnly,
    onUpdate,
  });

  useEffect(() => {
    if (readOnly && (!initialValue || initialValue === '<p></p>')) {
      editor?.commands.setContent('<p>Отсутствует</p>');
    }
  }, [readOnly, initialValue, editor]);

  if (cancel && editor) {
    editor.commands.setContent(initialValue);
  }

  /* Имеет ли обёртка редактора псевдокласс focus-within?
      Проверка необходима, чтобы не было скачков цвета у рамок
      редактора и его кнопок */
  useEffect(() => {
    if (wrapperRef.current?.matches(':focus-within')) {
      setInFocusWithin(true);
    } else {
      setInFocusWithin(false);
    }
  });

  return (
    <div className={`rte ${className ?? ''}`}>
      <EditorContent editor={editor} className="rte__editor" />
      {!readOnly && (
        <MenuBar editor={editor}>
          <RteButton
            editor={editor}
            name={commandsNames.italic}
            inFocusWithin={inFocusWithin}
          >
            <FormatItalicIcon />
          </RteButton>
          <RteButton
            editor={editor}
            name={commandsNames.bold}
            inFocusWithin={inFocusWithin}
          >
            <FormatBoldIcon />
          </RteButton>
          <RteButton
            editor={editor}
            name={commandsNames.code}
            inFocusWithin={inFocusWithin}
          >
            <CodeIcon />
          </RteButton>
          <RteButton
            editor={editor}
            name={commandsNames.codeBlock}
            inFocusWithin={inFocusWithin}
          >
            <DataObjectIcon />
          </RteButton>

          <Divider orientation="vertical" />

          <RteButton
            editor={editor}
            name={commandsNames.left}
            inFocusWithin={inFocusWithin}
          >
            <FormatAlignLeftIcon />
          </RteButton>
          <RteButton
            editor={editor}
            name={commandsNames.center}
            inFocusWithin={inFocusWithin}
          >
            <FormatAlignCenterIcon />
          </RteButton>
          <RteButton
            editor={editor}
            name={commandsNames.right}
            inFocusWithin={inFocusWithin}
          >
            <FormatAlignRightIcon />
          </RteButton>
          <RteButton
            editor={editor}
            name={commandsNames.justify}
            inFocusWithin={inFocusWithin}
          >
            <FormatAlignJustifyIcon />
          </RteButton>

          <RteButton
            editor={editor}
            name={commandsNames.bulletList}
            inFocusWithin={inFocusWithin}
          >
            <FormatListBulletedIcon />
          </RteButton>
          <RteButton
            editor={editor}
            name={commandsNames.orderedList}
            inFocusWithin={inFocusWithin}
          >
            <FormatListNumberedIcon />
          </RteButton>
        </MenuBar>
      )}
    </div>
  );
});
