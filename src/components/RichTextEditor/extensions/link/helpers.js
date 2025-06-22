// @ts-check
import { shallowEqual } from 'react-redux';
import { allowedProtocols as allowedProtocolsOuter } from './constants';

// #region isAllowedUriInternal
// adapted source code from @tiptap/extension-link
// see function isAllowedUri (name on version 2.11.5)

// From DOMPurify
// https://github.com/cure53/DOMPurify/blob/main/src/regexp.js
const ATTR_WHITESPACE =
  // eslint-disable-next-line no-control-regex
  /[\u0000-\u0020\u00A0\u1680\u180E\u2000-\u2029\u205F\u3000]/g;

/**
 * @param {string | undefined} uri
 * @param {import('@tiptap/extension-link').LinkOptions['protocols']} protocols
 * @returns {true | RegExpMatchArray | null}
 */
export function isAllowedUriCustom(uri, protocols) {
  /** @type {string[]} */
  const allowedProtocols = [...allowedProtocolsOuter];
  if (protocols) {
    protocols.forEach((protocol) => {
      const nextProtocol =
        typeof protocol === 'string' ? protocol : protocol.scheme;

      if (nextProtocol) {
        allowedProtocols.push(nextProtocol);
      }
    });
  }

  const res =
    !uri ||
    uri.replace(ATTR_WHITESPACE, '').match(
      // eslint-disable-next-line no-useless-escape
      new RegExp(`^(?:(?:${allowedProtocols.join('|')}):|[^a-z]|[a-z0-9+.\-]+(?:[^a-z+.\-:]|$))`, 'i') // prettier-ignore
    );
  return res;
}
// #endregion isAllowedUriInternal

/** @param {{ href: string; target: string; rel: string }} params */
export function goThroughLink({ href, target, rel }) {
  if (!href) {
    console.warn('RTE - goThroughLink: href not passed!');
    return;
  }

  Object.assign(document.createElement('a'), {
    target: target || '_blank',
    rel: rel || 'noopener noreferrer',
    href,
  }).click();
}

/**
 * @param {HTMLElement} el
 * @param {number} stopFactor - макс. число итераций. Связано с числом марок,\
 *   которые могут быть применены к параграфу(или к др. ноде, способной содержать\
 *   марку ссылки) и приоритет которых ниже, чем у марки "ссылка"\
 *   (ведь тогда эти марки окажутся в дом-дереве внутри ссылки)
 * @param {string} stoppingClass - класс, выше которого поиск не пойдёт
 * @returns {HTMLAnchorElement | null}
 */
export function findLinkInParents(el, stopFactor, stoppingClass) {
  const safeFactor = Math.min(stopFactor, 10_000);
  if (safeFactor === 10_000) {
    console.warn('RTE - findLinkInParents: passed factor greater than 10_000!');
  }

  let counter = 0;
  /** @type {HTMLElement | null} */
  let curEl = el;
  let result = false;

  while (
    !result &&
    counter <= safeFactor &&
    !curEl?.classList.contains(stoppingClass)
  ) {
    result = curEl?.tagName === 'A';
    if (!result) {
      curEl = curEl?.parentElement || null;
    }
    counter++;
  }

  if (!result) {
    return null;
  }

  // @ts-ignore
  return curEl;
}

/**
 * Функция для подсчёта числа марок ссылок в текущей селекции
 *
 * Сравниваются неглубоким способом атрибуты марок ссылок в селекции
 *
 * @param {import('@tiptap/pm/view').EditorView} view
 * @returns {number}
 */
export function countLinksInSelection(view) {
  const { state } = view;
  const { selection } = state;
  const { from, to } = selection;

  let count = 0;

  let prevAttrs = {};
  state.doc.nodesBetween(from, to, (node, _pos) => {
    if (node.isText) {
      node.marks.forEach((mark) => {
        if (mark.type === state.schema.marks.link) {
          if (!shallowEqual(prevAttrs, mark.attrs)) {
            prevAttrs = mark.attrs;
            count += 1;
          }
        }
      });
    }
  });

  return count;
}
