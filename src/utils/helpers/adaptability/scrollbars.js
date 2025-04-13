// @ts-check

export function getScrollBarWidth() {
  const inner = document.createElement('p');
  inner.style.width = '100%';
  inner.style.height = '200px';

  const outer = document.createElement('div');
  outer.style.position = 'absolute';
  outer.style.top = '0px';
  outer.style.left = '0px';
  outer.style.visibility = 'hidden';
  outer.style.width = '200px';
  outer.style.height = '150px';
  outer.style.overflow = 'hidden';
  outer.appendChild(inner);

  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = 'scroll';
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }

  document.body.removeChild(outer);

  return w1 - w2;
}

/**
 * Вернет паддинги элемента в пикселях.
 *
 * @param {CSSStyleDeclaration | string} value результат `getComputedStyles`
 * @returns {{ t: number; r: number; b: number; l: number }}
 */
export function extractPaddings(value) {
  let paddingStr = '';
  if (typeof value === 'string') {
    paddingStr = value;
  } else {
    paddingStr = value.padding;
  }
  const paddings = paddingStr.split(' ').map((i) => parseFloat(i));

  const res = {
    t: 0,
    r: 0,
    b: 0,
    l: 0,
  };

  switch (paddings.length) {
    case 0: {
      break;
    }
    case 1: {
      for (const key in res) {
        const _res = isNaN(paddings[0]) ? 0 : paddings[0];
        // @ts-ignore
        res[key] = _res;
      }
      break;
    }
    case 2: {
      res.t = paddings[0];
      res.r = paddings[1];
      res.b = paddings[0];
      res.l = paddings[1];
      break;
    }
    case 3: {
      res.t = paddings[0];
      res.r = paddings[1];
      res.b = paddings[2];
      res.l = paddings[1];
      break;
    }
    case 4: {
      res.t = paddings[0];
      res.r = paddings[1];
      res.b = paddings[2];
      res.l = paddings[3];
      break;
    }
    default: {
      break;
    }
  }

  return res;
}
