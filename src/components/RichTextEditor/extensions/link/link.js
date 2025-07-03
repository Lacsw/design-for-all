// @ts-check
import Link from '@tiptap/extension-link';
import { isAllowedUriCustom } from './helpers';
import { linkExtConfig } from './config';

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
      'Mod-k': () => {
        return this.editor.commands.toggleLink({
          href: 'https://example.com',
        });
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
