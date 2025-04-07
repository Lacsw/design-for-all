// @ts-check

/**
 * @typedef TArtNavBarProps
 * @property {boolean} isShowing
 * @property {string} label
 * @property {number} index Номер текущего заголовка
 * @property {number} quantity Число заголовков
 * @property {React.MouseEventHandler<HTMLDivElement>} onClick
 * @property {string} [id]
 * @property {string} [className]
 * @property {import('@mui/material').SxProps} [sx]
 */

/**
 * @typedef TArtNavModalProps
 * @property {boolean} isOpen
 * @property {HTMLHeadElement[]} headings
 * @property {import('./dtypes').ICloseArtNavModal} onClose
 * @property {string} [id]
 * @property {string} [className]
 * @property {import('@mui/material').SxProps} [sx]
 */

/**
 * @typedef TArticleNavigatorProps
 * @property {boolean} flag булевый флаг, который отвечает за ререндер.\
 *   Поменяйте его значение, когда компонент редактора закончит парсинг и\
 *   **вставку своих нод в dom-дерево**!
 * @property {string} parentSelector селектор эл-та, в который будет вставлен
 *   эл-т навигатора (абсолютом)
 * @property {string} targetSelector селектор для элемента внутри `targetRef`, в
 *   котором будут искаться заголовки
 * @property {React.RefObject<HTMLElement | null>} targetRef ссылка на
 *   dom-element, в котором будут искаться заголовки
 * @property {[string, 'root' | 'target']} scrollableElParams 1. селектор эл-та,
 *   который прокручивается. События скролла данного эл-та(и
 *   `firstShowingOffset`) будут использованы для вычисления необходимости
 *   появления компонента
 *
 *   2. Искать начиная с `document` или можно искать внутри `targetRef`
 *
 * @property {number} [firstShowingOffset=200] величина смещения первого
 *   заголовка в пикселях относительно верха окна(по модулю), начиная с которой
 *   элемент навигатора будет появляться. Default is `200`
 * @property {number} [scrollPercent=70] порог для величины прокрутки после
 *   которого эл-т скрывается. Default is `70`
 * @property {number[]} [targetHeadings=[1,2,3,4,5,6]] Какие заголовки искать.
 *   Default is `[1,2,3,4,5,6]`
 * @property {string} [classNameBar]
 * @property {string} [classNameModal]
 * @property {import('@mui/material').SxProps} [sxBar]
 * @property {import('@mui/material').SxProps} [sxModal]
 * @property {string} [idBar]
 * @property {string} [idModal]
 */

export const Types = {};
