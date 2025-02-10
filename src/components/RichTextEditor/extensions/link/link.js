// @ts-check
import Link, { isAllowedUri } from '@tiptap/extension-link';

export const CustomLinkExtension = Link.extend({
  renderHTML({ HTMLAttributes }) {
    // prevent XSS attacks
    if (
      !this.options.isAllowedUri(HTMLAttributes.href, {
        defaultValidate: (href) => !!isAllowedUri(href, this.options.protocols),
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
});
