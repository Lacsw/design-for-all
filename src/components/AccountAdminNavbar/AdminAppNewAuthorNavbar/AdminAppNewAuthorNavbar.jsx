import { useRef, useState } from 'react';
import approveIconW from 'images/account/publish-icon.svg';
import approveIconB from 'images/account/publish-icon_black.svg';
import rejectIconW from 'images/account/cancel-icon.svg';
import rejectIconB from 'images/account/cancel-icon_black.svg';
import backIconW from 'images/account/logout-icon.svg';
import backIconB from 'images/account/logout-icon_black.svg';
import { useSelector } from 'react-redux';
import { getCurrentTheme, getDecision } from 'store/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendDecision } from 'utils/api/admin';
import { Modal } from 'components';
import './AdminAppNewAuthorNavbar.css';

const requestPaths = {
  created_account: '_statement_author_account',
  created: '_create_p',
  updated: '_update_p',
  created_lang: '_update_lang_p',
};

const icons = {
  approve: {
    dark: approveIconW,
    light: approveIconB,
  },
  reject: {
    dark: rejectIconW,
    light: rejectIconB,
  },
  back: {
    dark: backIconW,
    light: backIconB,
  },
};

export default function AdminAppNewAuthorNavbar() {
  const { state } = useLocation();
  const inputRef = useRef(null);
  const theme = useSelector(getCurrentTheme);
  const postData = useSelector(getDecision);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);

  function handleInput({ target }) {
    if (confirm && target.value.length < 5) setConfirm(false);
    if (!confirm && target.value.length >= 5) setConfirm(true);
  }

  function handlePost(action) {
    let fullData =
      action === 'reject'
        ? { ...postData, reason_rejected: inputRef.current.value }
        : postData;
    const endPoint = action + requestPaths[state.type];
    sendDecision(endPoint, fullData)
      .then((link) => {
        link?.url_link && console.log(link.url_link);
        navigate(-1);
      })
      .catch((err) => console.warn(err));
  }

  return (
    <nav className="new-article-navbar">
      <ul className="new-article-navbar__list">
        <li>
          <button
            className="link-button"
            name="approve"
            onClick={() => handlePost('approve')}
            disabled={!state || state.type === 'updated'}
          >
            <img src={icons.approve[theme]} alt="Галочка" />
            Подтвердить
          </button>
        </li>

        <li>
          <button
            className="link-button"
            name="reject"
            onClick={() => setIsOpenModal(true)}
            disabled={!state || state.type === 'updated'}
          >
            <img src={icons.reject[theme]} alt="Крестик" />
            Отклонить
          </button>
        </li>

        <li>
          <button className="link-button" onClick={() => navigate(-1)}>
            <img src={icons.back[theme]} alt="Стрелка назад" />
            Назад к заявкам
          </button>
        </li>
      </ul>
      <Modal
        title="Укажите причину"
        isOpen={isOpenModal}
        twoBtns
        onConfirm={() => handlePost('reject')}
        onClose={() => setIsOpenModal(false)}
        isBlocked={!confirm}
      >
        <input
          type="text"
          placeholder="Введите текст"
          className="input-reason"
          ref={inputRef}
          onChange={handleInput}
        />
      </Modal>
    </nav>
  );
}
