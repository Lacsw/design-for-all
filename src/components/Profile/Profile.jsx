import { useDispatch, useSelector } from 'react-redux';
import './Profile.css';
import {
  Button,
  SocialsBar,
  InputEditable,
  Modal,
  ModalSocials,
} from 'components';
import { useRef, useState } from 'react';
import ModalFIO from 'components/Modal/ModalFIO/ModalFIO';
import ModalLogPass from 'components/Modal/ModalLogPass/ModalLogPass';
import authApi from 'utils/api/auth';
import { signInSuccess } from 'store/slices/user';
import DropdownIcons from 'components/DropdownIcons/DropdownIcons';
import { imageDropdown } from '../../constants/dropdowns';
import dotsIcon from 'images/dropdowns/three-dots.svg';
import defaultAvatar from 'images/admin/avatar_default.svg';
import { useTranslation } from 'react-i18next';
import { PROFILE } from 'utils/translationKeys';

const initialForm = {
  login: '',
  old_login: '',
  password: '',
  old_password: '',
  fio: '',
  avatar: '',
  social_media: {},
};

export default function Profile({ resetSection }) {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ...initialForm,
    avatar: currentUser.avatar,
    social_media:
      currentUser.social_media && typeof currentUser.social_media === 'object'
        ? currentUser.social_media
        : {},
  });
  const [modal, setModal] = useState('');
  const [canAdd, setCanAdd] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const isSocialMediaChanged =
    JSON.stringify(formData.social_media) !==
    JSON.stringify(currentUser.social_media);

  const isFormReady =
    (formData.fio && formData.fio.trim().length > 0) ||
    (formData.login && formData.login.trim().length > 0) ||
    (formData.password && formData.password.trim().length > 0) ||
    (formData.avatar && formData.avatar !== currentUser.avatar) ||
    isSocialMediaChanged;

  function handleFormSubmit(evt) {
    evt.preventDefault();

    const filledData = Object.keys(formData).reduce((acc, key) => {
      if (
        (key === 'avatar' && formData[key] !== currentUser.avatar) ||
        (key !== 'avatar' && formData[key])
      ) {
        acc[key] = formData[key];
      }
      return acc;
    }, {});

    authApi
      .updateUser(filledData)
      .then(() => {
        if (filledData.login || filledData.password) {
          resetSection();
          dispatch(signInSuccess(null));
        } else {
          dispatch(signInSuccess({ ...currentUser, ...filledData }));
          setFormData({
            ...initialForm,
            avatar: formData.avatar,
            social_media: formData.social_media,
          });
        }
      })
      .catch((err) => console.warn(err));
  }

  function changeForm(data) {
    setFormData((prev) => {
      if (data.social_media) {
        return {
          ...prev,
          ...data,
          social_media: { ...prev.social_media, ...data.social_media },
        };
      }
      return { ...prev, ...data };
    });
  }

  function handleInput({ target }) {
    if (/^https:\/\/\S+\.\S+$/.test(target.value) && !canAdd) setCanAdd(true);
    if (!/^https:\/\/\S+\.\S+$/.test(target.value) && canAdd) setCanAdd(false);
  }

  function changeAvatar(action) {
    if (action === 'remove') {
      changeForm({ avatar: '' });
    }
    if (action === 'replace') {
      setModal('avatar');
    }
  }

  function handleEditSocial(platform, value) {
    setEditingContact({ type: platform, value });
    setModal('editSocial');
  }

  function handleDeleteSocial(platform) {
    setFormData((prev) => ({
      ...prev,
      social_media: Object.keys(prev.social_media).reduce((acc, key) => {
        if (key !== platform) {
          acc[key] = prev.social_media[key];
        }
        return acc;
      }, {}),
    }));
  }

  return (
    <>
      <form
        className="profile__form"
        id="profile-form"
        onSubmit={handleFormSubmit}
      >
        <div className="avatar-box">
          <div className="dropdown-box">
            <DropdownIcons
              mainIcon={dotsIcon}
              list={imageDropdown}
              onClick={changeAvatar}
            />
          </div>
          <img
            src={formData.avatar || defaultAvatar}
            alt="Аватар"
            className="profile__avatar"
          />
        </div>

        <fieldset className="profile__fieldset">
          <label className="profile__field">
            <span className="profile__sub-title">{t(PROFILE.FIO_LABEL)}</span>
            <InputEditable
              type={'text'}
              value={formData.fio || currentUser.fio}
              onOpen={() => setModal('fio')}
            />
          </label>

          <div className="profile__field">
            <span className="profile__sub-title">{t(PROFILE.SOCIAL_LABEL)}</span>
            <SocialsBar
              onOpen={() => {
                setModal('addSocials');
                setEditingContact(null);
              }}
              socialMediaList={formData.social_media}
              onEdit={handleEditSocial}
              onDelete={handleDeleteSocial}
            />
          </div>

          <label className="profile__field">
            <span className="profile__sub-title">{t(PROFILE.LOGIN_LABEL)}</span>
            <InputEditable
              type={'text'}
              value="**********"
              onOpen={() => setModal('login')}
            />
          </label>

          <label className="profile__field">
            <span className="profile__sub-title">{t(PROFILE.PASSWORD_LABEL)}</span>
            <InputEditable
              type={'text'}
              value="**********"
              onOpen={() => setModal('password')}
            />
          </label>
        </fieldset>
      </form>
      <div className="profile__buttons">
        <Button
          type={'submit'}
          relatedForm={'profile-form'}
          disabled={!isFormReady}
        >
          {t(PROFILE.SAVE_BTN_LABEL)}
        </Button>
        <Button
          type={'button'}
          disabled={!isFormReady}
          onClick={() => setFormData(currentUser)}
        >
          {t(PROFILE.CANCEL_BTN_LABEL)}
        </Button>
      </div>
      <ModalFIO
        isOpen={modal === 'fio'}
        onClose={() => setModal('')}
        onSave={changeForm}
        title={t(PROFILE.MODAL.FIO_TITLE)}
      />
      <ModalLogPass
        isOpen={modal === 'login' || modal === 'password'}
        onClose={() => setModal('')}
        onSave={changeForm}
        name={modal === 'password' ? modal : 'login'}
      />
      <ModalSocials
        isOpen={modal === 'addSocials' || modal === 'editSocial'}
        onClose={() => {
          setModal('');
          setEditingContact(null);
        }}
        onSave={changeForm}
        title={modal === 'editSocial' ? t(PROFILE.MODAL.EDIT_SOCIAL_TITLE) : t(PROFILE.MODAL.ADD_SOCIAL_TITLE)}
        contact={editingContact}
      />
      <Modal
        title={t(PROFILE.MODAL.IMAGE_TITLE)}
        isOpen={modal === 'avatar'}
        twoBtns
        onConfirm={() => {
          changeForm({ avatar: inputRef.current.value });
          inputRef.current.value = '';
          setModal('');
        }}
        onClose={() => setModal('')}
        isBlocked={!canAdd}
      >
        <input
          type="text"
          placeholder={t(PROFILE.MODAL.INPUT_IMAGE_PLACEHOLDER)}
          className="input-reason"
          ref={inputRef}
          onChange={handleInput}
        />
      </Modal>
    </>
  );
}
