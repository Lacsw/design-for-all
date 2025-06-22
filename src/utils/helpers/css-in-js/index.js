// @ts-check

/** @param {string} name */
export function getCssVar(name) {
  const res = window
    .getComputedStyle(document.documentElement)
    .getPropertyValue(name);

  if (res === '') {
    throw new Error(`CSS-var ${name} was not found!`);
  }

  return res;
}
