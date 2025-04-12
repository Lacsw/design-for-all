import { getScrollBarWidth } from 'utils/helpers/adaptability/scrollbars';

export const targetHeadingsDefault = [1, 2, 3, 4, 5, 6];
export const firstShowingOffsetDefault = 200;
export const scrollPercentDefault = 70;

/** @type {import('@mui/material').ModalOwnProps['slotProps']} */
export const barSlotProps = {
  backdrop: {
    timeout: 700,
  },
};

/** @type {import('@mui/material').ModalOwnProps['slotProps']} */
export const modalSlotProps = {
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
