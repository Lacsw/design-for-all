export const modalRoot = document.getElementById('react-modals');

export const OPEN_MODAL_EVT_NAME = 'modal-on';
export const CLOSE_MODAL_EVT_NAME = 'modal-off';

export const openModalEvt = new Event(OPEN_MODAL_EVT_NAME);
export const closeModalEvt = new Event(CLOSE_MODAL_EVT_NAME);
