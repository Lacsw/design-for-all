import Placeholder from '@tiptap/extension-placeholder';
import Superscript from '@tiptap/extension-superscript';
import Subscript from '@tiptap/extension-subscript';
import Underline from '@tiptap/extension-underline';
import TextAlign from '@tiptap/extension-text-align';
import StarterKit from '@tiptap/starter-kit';
import { useEditor, EditorContent } from '@tiptap/react';
// icons
import SuperscriptIcon from '@mui/icons-material/Superscript';
import SubscriptIcon from '@mui/icons-material/Subscript';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatAlignJustifyIcon from '@mui/icons-material/FormatAlignJustify';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import DataObjectIcon from '@mui/icons-material/DataObject';
import CodeIcon from '@mui/icons-material/Code';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
// --- --- --- ---
import { Divider } from '@material-ui/core';
import React, { memo, useEffect } from 'react';

import MenuBar from './MenuBar';
import { useTiptapStyles } from './styles';
import { TtButton } from './MenuBar';
import { validate } from './validators';
import { commandsNames } from './help6ers';

// Для тестов
// let mockContent = "";
// const mockArr: string[] = [];
// for (let i = 0; i < 1010; i++) {
//     mockArr.push(`<p>Item ${i}.</p>`);
// }
// mockContent = mockArr.join("");

const defaultValidationsOptions = {
  kinds: {},
  mode: 'check',
};

/** Богатый текстовый редактор */
export const Tiptap = memo(function Tiptap({
  initialValue = null,
  validationsOptions,
  onInput,
  readOnly = false,
  className,
  cancel,
  maxHeight = 'auto',
}) {
  const classes = useTiptapStyles({ readOnly, maxHeight });
  const extensions = [
    StarterKit.configure({
      blockquote: false,
      horizontalRule: false,
      strike: false,
      bulletList: {
        HTMLAttributes: {
          class: classes.bulletList,
        },
      },
      orderedList: {
        HTMLAttributes: {
          class: classes.orderedList,
        },
      },
      code: {
        HTMLAttributes: {
          class: classes.code,
        },
      },
      codeBlock: {
        HTMLAttributes: {
          class: classes.codeBlock,
        },
      },
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    Underline.configure({
      HTMLAttributes: {
        class: classes.underline,
      },
    }),
    Subscript,
    Superscript,
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

  const onUpdate = ({ editor, transaction }) => {
    // Передаём данные о вводе в родител
    if (onInput) {
      const htmlString = editor.getHTML();
      if (_validationsOptions) {
        const result = validate(_validationsOptions, htmlString);
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

  return (
    <div className={`${classes.wrapper} ${className ?? ''}`}>
      <EditorContent editor={editor} className={classes.editor} />
      {!readOnly && (
        <MenuBar editor={editor} className={classes.menuBar}>
          <TtButton editor={editor} name={commandsNames.italic}>
            <FormatItalicIcon />
          </TtButton>
          <TtButton editor={editor} name={commandsNames.bold}>
            <FormatBoldIcon />
          </TtButton>
          <TtButton editor={editor} name={commandsNames.underline}>
            <FormatUnderlinedIcon />
          </TtButton>
          <TtButton editor={editor} name={commandsNames.code}>
            <CodeIcon />
          </TtButton>
          <TtButton editor={editor} name={commandsNames.codeBlock}>
            <DataObjectIcon />
          </TtButton>

          <Divider orientation="vertical" />

          <TtButton editor={editor} name={commandsNames.left}>
            <FormatAlignLeftIcon />
          </TtButton>
          <TtButton editor={editor} name={commandsNames.center}>
            <FormatAlignCenterIcon />
          </TtButton>
          <TtButton editor={editor} name={commandsNames.right}>
            <FormatAlignRightIcon />
          </TtButton>
          <TtButton editor={editor} name={commandsNames.justify}>
            <FormatAlignJustifyIcon />
          </TtButton>

          <TtButton editor={editor} name={commandsNames.bulletList}>
            <FormatListBulletedIcon />
          </TtButton>
          <TtButton editor={editor} name={commandsNames.orderedList}>
            <FormatListNumberedIcon />
          </TtButton>

          <TtButton editor={editor} name={commandsNames.subscript}>
            <SubscriptIcon />
          </TtButton>
          <TtButton editor={editor} name={commandsNames.superscript}>
            <SuperscriptIcon />
          </TtButton>
        </MenuBar>
      )}
    </div>
  );
});
