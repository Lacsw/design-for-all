import { useRef, useState } from 'react';
import approveIconW from 'images/account/publish-icon.svg';
import approveIconB from 'images/account/publish-icon_black.svg';
import rejectIconW from 'images/account/cancel-icon.svg';
import rejectIconB from 'images/account/cancel-icon_black.svg';
import backIconW from 'images/account/logout-icon.svg';
import backIconB from 'images/account/logout-icon_black.svg';
import { useSelector } from 'react-redux';
import { getDecision } from 'store/slices/user';
import { getCurrentTheme } from 'store/slices/theme';
import { useLocation, useNavigate } from 'react-router-dom';
import adminApi from 'utils/api/admin';
import { Modal } from 'components';
import './AdminAppNewAuthorNavbar.css';
import ReasonFields from './ReasonFields';
import { domain } from 'utils/config';

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

function canApprove(state, fields) {
  if (!state) return false;
  if (state.type !== 'updated') return true;
  if (!fields) return false;
  return Object.values(fields).some((value) => value === 'approve');
}

export default function AdminAppNewAuthorNavbar() {
  const { state } = useLocation();
  const inputRef = useRef(null);
  const theme = useSelector(getCurrentTheme);
  const postData = useSelector(getDecision);
  const [reasonModal, setReasonModal] = useState('');
  const [decisionModal, setDecisionModal] = useState('');
  const navigate = useNavigate();
  const [confirm, setConfirm] = useState(false);
  const approveDisabled = !canApprove(state, postData.fields);

  function handleInput({ target }) {
    target.style.height = 0;
    target.style.height = target.scrollHeight + 'px';
    if (confirm && target.value.length < 5) setConfirm(false);
    if (!confirm && target.value.length >= 5) setConfirm(true);
  }

  function handlePost(action) {
    const fullData = { ...postData };
    if (state.type === 'updated' && action === 'approve') {
      const rejectedFields = Object.keys(fullData.fields).filter(
        (key) => fullData.fields[key] === 'reject'
      );
      if (rejectedFields.length !== 0) {
        fullData.rejected_fields = rejectedFields;
        fullData.reason_rejected = inputRef.current.value;
      }
    }

    delete fullData.fields;

    if (action === 'reject' && state.type !== 'created_account') {
      fullData.reason_rejected = inputRef.current.value;
    }
    const endPoint = action + requestPaths[state.type];
    adminApi
      .sendDecision(endPoint, fullData)
      .then((link) => {
        if (state.type === 'created_account') {
          navigate(-1);
          return;
        }
        const modalArg = link?.url_link || 'reject';
        setDecisionModal(modalArg);
      })
      .catch((err) => console.warn(err));
  }

  function approveUpdate() {
    if (Object.values(postData.fields).some((value) => value === 'reject')) {
      setReasonModal('approve');
    } else handlePost('approve');
  }

  return (
    <nav className="new-article-navbar">
      <ul className="new-article-navbar__list">
        {state?.status ? (
          <li>
            <p className="new-article-navbar__status">
              Статус:{' '}
              {state.status === 'approve' ? 'Подтверждено' : 'Отклонено'}
            </p>
          </li>
        ) : (
          <>
            <li>
              <button
                className="link-button"
                name="approve"
                onClick={
                  state.type === 'updated'
                    ? approveUpdate
                    : () => handlePost('approve')
                }
                disabled={approveDisabled}
              >
                <img src={icons.approve[theme]} alt="Галочка" />
                Подтвердить
              </button>
            </li>

            <li>
              <button
                className="link-button"
                name="reject"
                onClick={
                  state.type === 'created_account'
                    ? () => handlePost('reject')
                    : () => setReasonModal('reject')
                }
                disabled={!state}
              >
                <img src={icons.reject[theme]} alt="Крестик" />
                Отклонить
              </button>
            </li>
          </>
        )}
        <li>
          <button className="link-button" onClick={() => navigate(-1)}>
            <img src={icons.back[theme]} alt="Стрелка назад" />
            Назад к заявкам
          </button>
        </li>
      </ul>

      <Modal
        title={reasonModal === 'approve' ? 'Причина' : 'Укажите причину'}
        isOpen={reasonModal}
        twoBtns
        onConfirm={
          reasonModal === 'approve'
            ? () => handlePost('approve')
            : () => handlePost('reject')
        }
        onClose={() => setReasonModal('')}
        isBlocked={!confirm}
        large
      >
        {reasonModal === 'approve' && <ReasonFields fields={postData.fields} />}
        <textarea
          rows="1"
          placeholder="Причина отклонения"
          className="input-reason"
          ref={inputRef}
          onChange={handleInput}
        />
      </Modal>

      <Modal
        title={
          decisionModal === 'reject'
            ? 'Заявка отклонена'
            : 'Заявка подтверждена'
        }
        onConfirm={() => navigate(-1)}
        isOpen={decisionModal}
        large
      >
        <p className="small-text">
          Вы {decisionModal === 'reject' ? 'отклонили' : 'подтвердили'}{' '}
          предложение {state.type} статьи.
        </p>
        {decisionModal === 'reject' ? (
          <div className="reject-textbox">
            <p className="reject-text reject-text_center">
              Автор увидит следующую причину:
            </p>
            {inputRef.current.value.split('\n').map((text, i) => (
              <p key={i} className="reject-text">
                {text}
              </p>
            ))}
          </div>
        ) : (
          <p className="small-text">
            Статья доступна по ссылке:
            <br />
            {domain + '/' + decisionModal}
          </p>
        )}
      </Modal>
    </nav>
  );
}
