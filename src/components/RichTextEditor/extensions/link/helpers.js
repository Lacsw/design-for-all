// @ts-check

/** @param {{ href: string; target: string; rel: string }} params */
export function goThroughLink({ href, target, rel }) {
  if (!href) {
    console.warn('Href not passed!');
    return;
  }

  Object.assign(document.createElement('a'), {
    target: target || '_blank',
    rel: rel || 'noopener noreferrer',
    href,
  }).click();
}
