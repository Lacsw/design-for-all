// @ts-check
import { getScrollBarWidth } from 'utils/helpers/adaptability/scrollbars';
import { CLOSE_MODAL_EVT_NAME, OPEN_MODAL_EVT_NAME } from '../constants';

// В проекте есть пара решений, которые требуют костылей при работе с модалками.
// Проблемные решения:
// 1. Общесайтовый скролл висит на элементе html
// 2. Шапка сайта имеет position: fixed
// Проблема: скачки положения для фиксированных элементов, когда открываешь или закрываешь модалки.

const scrollW = getScrollBarWidth();
document.documentElement.style.setProperty('--scroll-w', scrollW + 'px');
document.documentElement.style.setProperty('--modal-corrector', '0px');

function handleModalOpening() {
  const scrollW = getScrollBarWidth();
  document.documentElement.style.setProperty('--scroll-w', scrollW + 'px');
  document.documentElement.style.setProperty(
    '--modal-corrector',
    scrollW + 'px'
  );
  document.documentElement.classList.add('has-modal');
}

function handleModalClosing() {
  document.documentElement.style.setProperty('--modal-corrector', '0px');
  document.documentElement.classList.remove('has-modal');
}

window.addEventListener(OPEN_MODAL_EVT_NAME, handleModalOpening);
window.addEventListener(CLOSE_MODAL_EVT_NAME, handleModalClosing);
