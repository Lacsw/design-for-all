// @ts-check

/* При открытии модалки от MUI она вешает своим одноранговым соседям атрибут aria-hidden.
    Но кастомный дом-элемент vite-plugin-checker не принимает данный атрибут, на что
    ругается сам браузер похоже, а не плагин вита. И всё работало, но предупреждалка раздражала,
    так что убрал это.
*/
const element = document.querySelector('vite-plugin-checker-error-overlay');
if (element) {
  const originalSetAttribute = element.setAttribute.bind(element);

  element.setAttribute = function (attr, value) {
    if (attr === 'aria-hidden') {
      return;
    }
    return originalSetAttribute(attr, value);
  };
} else {
  // @ts-ignore
  if (process.env.NODE_ENV === 'development') {
    console.warn(
      "Can't find DOM-element for vite-plugin-checker for preventing attribute 'aria-hidden' setting!"
    );
  }
}
