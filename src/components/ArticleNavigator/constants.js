import { getScrollBarWidth } from 'utils/helpers/adaptability/scrollbars';

export const targetHeadingsDefault = [1, 2, 3, 4, 5, 6];
export const firstShowingOffsetDefault = 200;
export const scrollPercentDefault = 70;

export const scrollableRefStub = {
  el: null,
  data: null,
  direction: 'ltr',
  barWidth: getScrollBarWidth(),
  paddings: {
    t: 0,
    r: 0,
    b: 0,
    l: 0,
  },
};
