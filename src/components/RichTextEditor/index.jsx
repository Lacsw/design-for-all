// @ts-check
// custom extensions
import { linkExtConfig } from './extensions/link/config';
import { CustomLinkExtension } from './extensions/link/link';
import { CustomHeadingExtension } from './extensions/heading/heading';
import { ListItemCustom } from './extensions/listItem';
import { CustomImageExtension } from './extensions/image/image';

// extensions
import Placeholder from '@tiptap/extension-placeholder';
// import ImgTiptap from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import { EditorContent, useEditor } from '@tiptap/react';

// icons
import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
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
import React, {
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import { MenuBar, RteButton } from './components';
import { TextTypeSelector } from './components/selectors/TextTypeSelector/TextTypeSelector';
import { ImageModal } from './extensions/image/ImageModal';
import { allowedHeadingLevels, COMMANDS_NAMES } from './helpers/constants';
import { parseOptions } from './validation/constants';
import { validate } from './validation';
import { useDebounce } from 'utils/hooks';
import { useImageExt } from './extensions/image/useImageExt';
import { useValidation } from './validation/useValidation';

import clsx from 'clsx';
import './index.css';
import './components/index.css';
import './extensions/heading/index.css';
import './extensions/link/index.css';
import { sxEditorWrapper } from './styles';
import { customHeadingNodeName } from './extensions/heading/constants';

/**
 * @param {import('@tiptap/core').Editor} editor
 * @param {import('./types').TJDRteOnInputProp} onInput
 * @param {import('./validation/types').TJDValidationOptions | undefined} [_validationsOptions]
 */
function _onUpdate(editor, onInput, _validationsOptions) {
  const htmlString = editor.getHTML();
  console.log(
    `%c ${htmlString.replaceAll(/[<>]/g, (substr) =>
      substr.includes('<') ? '\n<' : '>\n'
    )}`,
    'background-color: rgba(155, 154, 154, 0); color:rgb(0, 0, 0); padding: 5px; border: 1px dashed green;'
  );

  // const json = editor.getJSON();
  // console.log('json', json);

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

/** @type {import('./types').TJDRteClassesProp} */
const defaultClasses = {};

// #region extensions
const extensions = [
  StarterKit.configure({
    blockquote: false,
    horizontalRule: false,
    strike: false,
    listItem: false, // отключаем, т.к. у нас кастомный
    heading: false, // кастомные
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
    types: ['heading', 'paragraph', customHeadingNodeName],
  }),
  Placeholder.configure({
    placeholder: 'Введите текст',
  }),
  // ImgTiptap,
  ListItemCustom,
  CustomImageExtension.configure({
    // allowBase64: true,
    HTMLAttributes: {
      class: 'rte__node rte__node_img',
    },
  }),
  CustomHeadingExtension.configure({
    HTMLAttributes: {
      class: 'rte__node rte__node_heading',
    },
    levels: allowedHeadingLevels,
  }),
  CustomLinkExtension.configure(linkExtConfig),
];
// #endregion extensions

// #region FC
/**
 * Богатый текстовый редактор
 *
 * @type {import('./types').TJDRichTextEditor}
 */
export const RichTextEditor = memo(function RichTextEditor({
  initialValue = null,
  readOnly = false,
  cancel,
  onInput,
  validationsOptions,
  maxHeight = 'initial',
  id,
  className,
  classes = defaultClasses,
}) {
  const _validationsOptions = useValidation(validationsOptions);

  /** @type {React.RefObject<HTMLElement>} */
  const wrapperRef = useRef(null);
  /* Решением проблемы: если при вводе в редактор показывается обводка, сигнализирующая, что редактор в фокусе,
    то при кликах на кнопки команд на мгновения скачут цвета у рамок редактора и его кнопок. */
  const [inFocusWithin, setInFocusWithin] = useState(false);

  // #region onUpdate
  // Передаём данные о вводе в родителя
  const _onUpdateDebounced = useDebounce(_onUpdate, 500, true);
  const onUpdate = useCallback(
    /**
     * @param {import('@tiptap/react').EditorEvents['update']} props
     * @returns {void}
     */
    ({ editor, transaction }) => {
      if (onInput) {
        _onUpdateDebounced(editor, onInput, _validationsOptions);
      }
    },
    [onInput, _onUpdateDebounced, _validationsOptions]
  );

  /* При focusout на элементе обёртки синхронно отправляем данные в родителя,
  чтобы при быстрой отправке формы контент точно был свежим. */
  function handleBlurOnWrapper() {
    if (editor && onInput) {
      _onUpdate(editor, onInput, _validationsOptions);
    }
  }
  // #endregion onUpdate

  // #region useEditor
  /* при вызовах данного хука он возвращ-т одну и ту же ссылку похоже.
      и вроде как реальный вызов происходит только один раз
      (инстанс редактора не пересоздается, но конфигурируется при сменах ссылок напр на onUpdate ???)
   */
  const editor = useEditor({
    extensions,
    content: initialValue,
    editable: !readOnly,
    parseOptions,
    onUpdate,
    enableContentCheck: true, // не работает?
  });
  // #endregion useEditor

  useEffect(() => {
    if (readOnly && (!initialValue || initialValue === '<p></p>')) {
      // editor?.commands.setContent('<p>Отсутствует</p>');
    }
  }, [readOnly, initialValue, editor]);

  useEffect(() => {
    editor?.setOptions({ editable: !readOnly });
  }, [editor, readOnly]);

  if (cancel) {
    editor?.commands.setContent(initialValue);
  }

  // #region Handle focus
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
  // #endregion Handle focus

  const {
    imgModalOpen,
    // setImgModalOpen,
    handleAddImgBtnClick,
    handleImgInserting,
    handleImgModalClose,
  } = useImageExt(editor);

  // #region Bar
  /* Предотвращаем постоянный ререндер кнопок меню. Вызывало фризы при стирании контента */
  const Bar = useMemo(() => {
    if (readOnly) {
      return null;
    } else {
      return (
        // @ts-ignore
        <MenuBar editor={editor} className={classes.menuBar}>
          <TextTypeSelector
            // @ts-ignore
            editor={editor}
            className={classes.textTypeSelector}
            flag={flag}
          />
          <RteButton
            key={COMMANDS_NAMES.italic}
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.italic}
            inFocusWithin={inFocusWithin}
          >
            <FormatItalicIcon />
          </RteButton>
          <RteButton
            key={COMMANDS_NAMES.bold}
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.bold}
            inFocusWithin={inFocusWithin}
          >
            <FormatBoldIcon />
          </RteButton>
          <RteButton
            key={COMMANDS_NAMES.bulletList}
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.bulletList}
            inFocusWithin={inFocusWithin}
          >
            <FormatListBulletedIcon />
          </RteButton>
          <RteButton
            key={COMMANDS_NAMES.orderedList}
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.orderedList}
            inFocusWithin={inFocusWithin}
          >
            <FormatListNumberedIcon />
          </RteButton>
          <RteButton
            key={COMMANDS_NAMES.img}
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.img}
            inFocusWithin={inFocusWithin}
            onClick={handleAddImgBtnClick}
            mode="cb"
          >
            <AddPhotoAlternateRoundedIcon />
          </RteButton>
          <Divider orientation="vertical" />
          <RteButton
            key={COMMANDS_NAMES.left}
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.left}
            inFocusWithin={inFocusWithin}
          >
            <FormatAlignLeftIcon />
          </RteButton>
          <RteButton
            key={COMMANDS_NAMES.center}
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.center}
            inFocusWithin={inFocusWithin}
          >
            <FormatAlignCenterIcon />
          </RteButton>
          <RteButton
            key={COMMANDS_NAMES.right}
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.right}
            inFocusWithin={inFocusWithin}
          >
            <FormatAlignRightIcon />
          </RteButton>
          <RteButton
            key={COMMANDS_NAMES.justify}
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.justify}
            inFocusWithin={inFocusWithin}
          >
            <FormatAlignJustifyIcon />
          </RteButton>
          <Divider orientation="vertical" />
          <RteButton
            key={COMMANDS_NAMES.code}
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.code}
            inFocusWithin={inFocusWithin}
          >
            <CodeIcon />
          </RteButton>
          <RteButton
            key={COMMANDS_NAMES.codeBlock}
            className={classes.button}
            editor={editor}
            name={COMMANDS_NAMES.codeBlock}
            inFocusWithin={inFocusWithin}
          >
            <DataObjectIcon />
          </RteButton>
        </MenuBar>
      );
    }
  }, [
    editor,
    inFocusWithin,
    classes.button,
    classes.menuBar,
    classes.textTypeSelector,
    readOnly,
    flag,
    handleAddImgBtnClick,
  ]);
  // #endregion Bar

  // #region Render
  return (
    <Box
      ref={wrapperRef}
      className={clsx('rte', className)}
      sx={sxEditorWrapper({ maxHeight })}
      id={String(id)}
      onBlur={handleBlurOnWrapper}
    >
      {useMemo(
        () => (
          <EditorContent editor={editor} className="rte__editor" />
        ),
        [editor]
      )}

      {Bar}

      <ImageModal
        open={imgModalOpen}
        onClose={handleImgModalClose}
        onConfirm={handleImgInserting}
      />
    </Box>
  );
  // #endregion Render
});
// #endregion FC
