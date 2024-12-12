import { useState } from 'react';
import approveIconW from 'images/account/publish-icon.svg';
import approveIconB from 'images/account/publish-icon_black.svg';
import rejectIconW from 'images/account/cancel-icon.svg';
import rejectIconB from 'images/account/cancel-icon_black.svg';
import backIconW from 'images/account/logout-icon.svg';
import backIconB from 'images/account/logout-icon_black.svg';
import { ModalAttention } from 'components';
import { useSelector } from 'react-redux';
import { getCurrentTheme, getDecision } from 'store/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { sendDecision } from 'utils/api/admin';

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
  const theme = useSelector(getCurrentTheme);
  const postData = useSelector(getDecision);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();
  const handleCancelClick = () => {
    setIsOpenModal(!isOpenModal);
  };

  function handlePost({ target }) {
    const endPoint = target.name + requestPaths[state.type];
    sendDecision(endPoint, postData)
      .then(() => {
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
            onClick={handlePost}
            disabled={!state || state.type !== 'created_account'}
          >
            <img src={icons.approve[theme]} alt="Галочка" />
            Подтвердить
          </button>
        </li>

        <li>
          <button
            className="link-button"
            name="reject"
            onClick={handlePost}
            disabled={!state || state.type !== 'created_account'}
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
      <ModalAttention
        isOpen={isOpenModal}
        onClose={handleCancelClick}
        title="Внимание!"
      />
    </nav>
  );
}
