// custom extensions
import { ListItemCustom } from './extensions/listItem';

// extensions
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

import { Box, Divider } from '@mui/material';
import React, { memo, useEffect, useMemo, useRef, useState } from 'react';

import { MenuBar, RteButton } from './components';
import { validate } from './validators';
import { COMMANDS_NAMES } from './helpers';
import { useDebounce } from 'utils/hooks';

import './index.css';
import './components/index.css';
import { sxEditorWrapper } from './styles';

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

function _onUpdate(editor, onInput, _validationsOptions) {
  const htmlString = editor.getHTML();
  if (_validationsOptions) {
    const result = validate(_validationsOptions, editor);
    onInput(result);
  } else {
    onInput({ validity: { isValid: true }, content: htmlString });
  }
}

const incrementStateNumber = (setter) => (evt) => {
  setter((prev) => prev + 1);
};

/** Богатый текстовый редактор IProps */
export const RichTextEditor = memo(function RichTextEditor({
  initialValue = null,
  validationsOptions,
  onInput,
  readOnly = false,
  className,
  classes,
  cancel,
  maxHeight = 'initial',
  id,
}) {
  const extensions = [
    StarterKit.configure({
      blockquote: false,
      horizontalRule: false,
      strike: false,
      listItem: false, // отключаем, т.к. у нас кастомный
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
    ListItemCustom,
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
  /* Решением проблемы: если при вводе редактор показывается обводка, сигнализирующая, что редактор в фокусе,
    то при кликах на кнопки команд на мгновения скачут цвета у рамок редактора и его кнопок.
   */
  const [inFocusWithin, setInFocusWithin] = useState(false);

  // Передаём данные о вводе в родителя
  const _onUpdateDebounced = useDebounce(_onUpdate, 500, true);
  const onUpdate = ({ editor, transaction }) => {
    if (onInput) {
      _onUpdateDebounced(editor, onInput, _validationsOptions);
    }
  };

  /* При focusout на элементе обёртки синхронно отправляем данные в родителя,
    чтобы при быстрой отправке формы контент точно был свежим. */
  function handleBlurOnWrapper() {
    if (editor && onInput) {
      _onUpdate(editor, onInput, _validationsOptions);
    }
  }

  const editor = useEditor({
    extensions,
    // content: mockContent,
    content: initialValue,
    editable: !readOnly,
    parseOptions: {
      // сохранять множественные пробелы? по ум. HTML схлопывает их
      preserveWhitespace: false,
    },
    onUpdate,
  });

  useEffect(() => {
    if (readOnly && (!initialValue || initialValue === '<p></p>')) {
      editor?.commands.setContent('<p>Отсутствует</p>');
    }
  }, [readOnly, initialValue, editor]);

  if (cancel) {
    editor?.commands.setContent(initialValue);
  }

  /* Имеет ли обёртка редактора псевдокласс focus-within?
      Проверка необходима, чтобы не было скачков цвета у рамок
      редактора и его кнопок */
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    if (wrapperRef.current?.matches(':focus-within')) {
      setInFocusWithin(true);
    } else {
      setInFocusWithin(false);
    }
  });

  // Просто число, котороё растёт при срабатывании опред. событий. Указано в зависимостях useMemo для меню с кнопками
  const [flag, setFlag] = useState(0);
  const onKeydown = useDebounce(incrementStateNumber(setFlag), 400, true);
  const onClick = useDebounce(incrementStateNumber(setFlag), 100, true);
  useEffect(() => {
    const wrapperEl = wrapperRef.current;
    wrapperEl?.addEventListener('keydown', onKeydown);
    wrapperEl?.addEventListener('click', onClick);
    return () => {
      wrapperEl?.removeEventListener('keydown', onKeydown);
      wrapperEl?.removeEventListener('click', onClick);
    };
  }, [onClick, onKeydown, wrapperRef]);

  /* Предотвращаем постоянный ререндер кнопок меню. Вызывало фризы при стирании контента */
  const Bar = useMemo(() => {
    if (readOnly) {
      return null;
    } else {
      return (
        <MenuBar editor={editor} className={classes.menuBar}>
          <RteButton
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.italic}
            inFocusWithin={inFocusWithin}
          >
            <FormatItalicIcon />
          </RteButton>
          <RteButton
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.bold}
            inFocusWithin={inFocusWithin}
          >
            <FormatBoldIcon />
          </RteButton>
          <RteButton
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.code}
            inFocusWithin={inFocusWithin}
          >
            <CodeIcon />
          </RteButton>
          <RteButton
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.codeBlock}
            inFocusWithin={inFocusWithin}
          >
            <DataObjectIcon />
          </RteButton>

          <Divider orientation="vertical" />

          <RteButton
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.left}
            inFocusWithin={inFocusWithin}
          >
            <FormatAlignLeftIcon />
          </RteButton>
          <RteButton
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.center}
            inFocusWithin={inFocusWithin}
          >
            <FormatAlignCenterIcon />
          </RteButton>
          <RteButton
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.right}
            inFocusWithin={inFocusWithin}
          >
            <FormatAlignRightIcon />
          </RteButton>
          <RteButton
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.justify}
            inFocusWithin={inFocusWithin}
          >
            <FormatAlignJustifyIcon />
          </RteButton>

          <RteButton
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.bulletList}
            inFocusWithin={inFocusWithin}
          >
            <FormatListBulletedIcon />
          </RteButton>
          <RteButton
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.orderedList}
            inFocusWithin={inFocusWithin}
          >
            <FormatListNumberedIcon />
          </RteButton>
        </MenuBar>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor, inFocusWithin, classes.button, classes.menuBar, readOnly, flag]);

  return (
    <Box
      ref={wrapperRef}
      className={`rte ${className ?? ''}`}
      sx={sxEditorWrapper({ maxHeight })}
      id={id}
      onBlur={handleBlurOnWrapper}
    >
      <EditorContent editor={editor} className="rte__editor" />
      {Bar}
    </Box>
  );
});
