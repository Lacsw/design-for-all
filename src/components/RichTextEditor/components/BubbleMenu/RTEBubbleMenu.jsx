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
            strategy: 'fixed',
            modifiers: [
              {
                name: 'preventOverflow',
                enabled: true,
                options: {
                  boundariesElement: 'div.main-wrapper', // Ограничивает тултип в пределах видимой области
                },
              },
              //   {
              //     name: 'hide',
              //     enabled: true, // Автоматически скрывает тултип, если он выходит за границы
              //   },
            ],
          },
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
