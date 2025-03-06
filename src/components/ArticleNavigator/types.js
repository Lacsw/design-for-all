// @ts-check

/**
 * @typedef TJDArticleNavigatorProps
 * @property {boolean} flag булевый флаг, который отвечает за ререндер
 * @property {string} selector селектор для элемента внутри `targetRef`, в
 *   котором будут искаться заголовки
 * @property {import('react').RefObject<HTMLElement | null>} targetRef ссылка на
 *   dom-element, в котором будут искаться заголовки
 * @property {[string, 'root' | 'target']} selectorOfScrollableEl 1. селектор
 *   эл-та, который прокручивается. События скролла данного эл-та(и
 *   `firstShowingOffset`) будут использованы для вычисления необходимости
 *   появления компонента
 *
 *   2. Искать начиная с `document` или можно искать внутри `targetRef`
 *
 * @property {string} parentSelector селектор эл-та, в который будет вставлен
 *   эл-т навигатора (абсолютом)
 * @property {number} [firstShowingOffset=200] величина смещения первого
 *   заголовка в пикселях относительно верха окна(по модулю), начиная с которой
 *   элемент навигатора будет появляться. Default is `200`
 * @property {number} [scrollPercent=70] порог для величины прокрутки после
 *   которого эл-т скрывается. Default is `70`
 * @property {number[]} [targetHeadings=[1,2,3,4,5,6]] Какие заголовки искать.
 *   Default is `[1,2,3,4,5,6]`
 * @property {string} className
 * @property {string} [id]
 * @property {import('@mui/material').SxProps} sx
 */

export const Types = {};
