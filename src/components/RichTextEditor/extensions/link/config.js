// @ts-check
import { disallowedDomains } from './constants';
import { find as findLinks } from 'linkifyjs';

/** @type {Partial<import('@tiptap/extension-link').LinkOptions>} */
export const linkExtConfig = {
  autolink: true,
  linkOnPaste: false,
  openOnClick: true,
  protocols: [], // custom protocols
  defaultProtocol: 'https',
  HTMLAttributes: {
    class: 'link_type_in-text rte__mark rte__mark_link',
    // remove nofollow -> allow search engines to follow links
    rel: 'noopener noreferrer',
    target: '_blank',
    /* contentEditable=false allows:
        - open the link with the mouse wheel, not just with LMB and Ctrl+LMB
        - show vanilla browser tooltip with link href
    */
    // contentEditable: true,
  },

  shouldAutoLink: (url) => {
    const result = findLinks(url)[0];

    switch (result.type) {
      case 'email':
        return false;
      default:
        break;
    }

    try {
      const parsedUrl = url.includes(':')
        ? new URL(url)
        : new URL(`https://${url}`);

      const domain = parsedUrl.hostname;

      return !disallowedDomains.includes(domain);
    } catch {
      return false;
    }
  },
};
