// @ts-check
import { disallowedDomains, disallowedProtocols } from './constants';

/** @type {Partial<import('@tiptap/extension-link').LinkOptions>} */
export const linkExtConfig = {
  autolink: true,
  linkOnPaste: true,
  openOnClick: true,
  protocols: ['http', 'https'],
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

  isAllowedUri: (url, ctx) => {
    try {
      // construct URL
      const parsedUrl = url.includes(':')
        ? new URL(url)
        : new URL(`${ctx.defaultProtocol}://${url}`);

      // use default validation
      if (!ctx.defaultValidate(parsedUrl.href)) {
        return false;
      }

      // disallowed protocols
      const protocol = parsedUrl.protocol.replace(':', '');

      if (disallowedProtocols.includes(protocol)) {
        return false;
      }

      // only allow protocols specified in ctx.protocols
      const allowedProtocols = ctx.protocols.map((prot) =>
        typeof prot === 'string' ? prot : prot.scheme
      );

      if (!allowedProtocols.includes(protocol)) {
        return false;
      }

      // disallowed domains
      const domain = parsedUrl.hostname;

      if (disallowedDomains.includes(domain)) {
        return false;
      }

      // all checks have passed
      return true;
    } catch {
      return false;
    }
  },

  shouldAutoLink: (url) => {
    try {
      // construct URL
      const parsedUrl = url.includes(':')
        ? new URL(url)
        : new URL(`https://${url}`);

      // only auto-link if the domain is not in the disallowed list
      const domain = parsedUrl.hostname;

      return !disallowedDomains.includes(domain);
    } catch {
      return false;
    }
  },
};
