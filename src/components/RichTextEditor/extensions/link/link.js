// @ts-check
import Link from '@tiptap/extension-link';
import { isAllowedUriCustom } from './helpers';
import { linkExtConfig } from './config';
import {
  STUB_LINK_HREF,
  STUB_LINK_TEXT,
  linkHotCreationEvt,
} from './constants';
import { checkIsCommandActive } from 'components/RichTextEditor/helpers';
import { COMMANDS_NAMES } from 'components/RichTextEditor/helpers/constants';

export const CustomLinkExtension = Link.extend({
  renderHTML({ HTMLAttributes }) {
    // prevent XSS attacks
    if (
      !this.options.isAllowedUri(HTMLAttributes.href, {
        defaultValidate: (href) =>
          !!isAllowedUriCustom(href, this.options.protocols),
        protocols: this.options.protocols,
        defaultProtocol: this.options.defaultProtocol,
      })
    ) {
      // strip out the href
      return [
        'a',
        {
          ...this.options.HTMLAttributes, // prohibit differents attrs values on links from other sites
          href: '',
        },
        0,
      ];
    }

    return [
      'a',
      {
        ...this.options.HTMLAttributes, // prohibit differents attrs values on links from other sites
        href: HTMLAttributes.href,
      },
      0,
    ];
  },

  // см. также editorProps handleKeyDown

  addKeyboardShortcuts() {
    return {
      'Mod-k': ({ editor }) => {
        const { from, to } = editor.state.selection;
        const isLinkInSelection = checkIsCommandActive(
          COMMANDS_NAMES.link,
          editor
        );
        const stubText = STUB_LINK_TEXT;

        window.dispatchEvent(linkHotCreationEvt);

        if (!isLinkInSelection && from === to) {
          editor.commands.insertContent(stubText);
          const from = editor.state.selection.from - stubText.length;
          const to = editor.state.selection.from;
          return (
            editor
              .chain()
              .setTextSelection({ from, to })
              .toggleLink({
                href: STUB_LINK_HREF,
              })
              .setTextSelection({
                from: editor.state.selection.to,
                to: editor.state.selection.to,
              })
              // .focus() // через горячие клавиши фокус и так остается в редакторе. А я думал, что из-за моей команды на фокус редактора --- не идёт программный фокус в инпут в бабл-меню. А он не шел, т.к. я фокусил корень - т.е. див))
              .run()
          );
        }

        return (
          editor
            .chain()
            .toggleLink({
              href: STUB_LINK_HREF,
            })
            // .focus()
            .run()
        );
      },
    };
  },
});

/**
 * @param {string} value
 * @returns {boolean}
 */
export function validateLink(value) {
  return linkExtConfig.isAllowedUri(value, {
    defaultValidate: (href) =>
      !!isAllowedUriCustom(href, linkExtConfig.protocols),
    protocols: linkExtConfig.protocols,
    defaultProtocol: linkExtConfig.defaultProtocol,
  });
}
