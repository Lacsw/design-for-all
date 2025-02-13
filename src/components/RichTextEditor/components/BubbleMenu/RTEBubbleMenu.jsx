// @ts-check
import { BubbleMenu } from '@tiptap/react';
import React, { memo } from 'react';

/**
 * @typedef TJDRTEBubbleMenuProps
 * @property {import('@tiptap/core').Editor | null} editor
 */

/** @type {import('react').FC<TJDRTEBubbleMenuProps>} */
const RTEBubbleMenuRaw = ({ editor }) => {
  return (
    editor && (
      <BubbleMenu
        shouldShow={() => true}
        tippyOptions={{
          duration: 300,
          placement: 'bottom',
          //   offset: ({ placement, popper, reference }) => {
          //     if (placement === 'bottom') {
          //       return [22, 0];
          //     } else if (placement === 'top') {
          //       return [0, 22];
          //     } else {
          //       return [10, 10];
          //     }
          //   },
          popperOptions: {
            strategy: 'fixed', // fix vertical scroll on html tag when bubble-menu outside of view (TODO WHY?)
          },
          zIndex: 1,
        }}
        className="rte__bubble-menu"
        editor={editor}
      >
        <div>Ahaha</div>
        <div>Bubub</div>
      </BubbleMenu>
    )
  );
};

export const RTEBubbleMenu = memo(RTEBubbleMenuRaw);
