// @ts-check

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
    !curEl.classList.contains(stoppingClass)
  ) {
    result = curEl?.tagName === 'A';
    if (!result) {
      curEl = curEl.parentElement;
    }
    counter++;
  }

  if (!result) {
    return null;
  }

  // @ts-ignore
  return curEl;
}

/** Функция для подсчёта определённой марки в текущей селекции */

/**
 * @param {import('@tiptap/pm/view').EditorView} view
 * @returns {number}
 */
export function countLinksInSelection(view) {
  const { state } = view;
  const { selection } = state;
  const { from, to } = selection;

  let count = 0;

  state.doc.nodesBetween(from, to, (node, pos) => {
    if (node.isText) {
      node.marks.forEach((mark) => {
        if (mark.type === state.schema.marks.link) {
          count += 1;
        }
      });
    }
  });

  return count;
}
