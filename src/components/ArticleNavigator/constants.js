// @ts-check
import { getScrollBarWidth } from 'utils/helpers/adaptability/scrollbars';

export const targetHeadingsDefault = [1, 2, 3, 4, 5, 6];
export const firstShowingOffsetDefault = 200;
export const scrollPercentDefault = 70;

/** @type {import('./types').IBarBaseProps} */
export const defaultBarSlotProps = {
  timeout: 500,
};

/** @type {import('@mui/material').ModalOwnProps['slotProps']} */
export const defaultModalSlotProps = {
  backdrop: {
    timeout: 700,
  },
};

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
