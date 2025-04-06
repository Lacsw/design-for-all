// @ts-check
// import { find as findLinks } from 'linkifyjs';
import { RTE_DEF_LINK_PROTO } from './constants';
import { isAllowedUriCustom } from './helpers';

/** @type {Partial<import('@tiptap/extension-link').LinkOptions>} */
export const linkExtConfig = {
  autolink: true,
  linkOnPaste: true,
  openOnClick: true,
  protocols: [], // custom protocols
  defaultProtocol: RTE_DEF_LINK_PROTO,
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

  // Effects on autolinking when pasting
  isAllowedUri(url, ctx) {
    return !!isAllowedUriCustom(url, ctx.protocols);
  },

  // Effects on autolinking when inputs
  // shouldAutoLink: (url) => {
  //   const result = findLinks(url)[0];

  //   switch (result.type) {
  //     case 'email':
  //       return false;
  //     default:
  //       break;
  //   }

  //   try {
  //     const parsedUrl = url.includes(':')
  //       ? new URL(url)
  //       : new URL(`${RTE_DEF_LINK_PROTO}://${url}`);

  //     const domain = parsedUrl.hostname;

  //     return !disallowedDomains.includes(domain);
  //   } catch {
  //     return false;
  //   }
  // },
};
