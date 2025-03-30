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
import { signInSuccess } from 'store/slices';
import DropdownIcons from 'components/DropdownIcons/DropdownIcons';
import { imageDropdown } from '../../constants/dropdowns';
import dotsIcon from 'images/dropdowns/three-dots.svg';
import defaultAvatar from 'images/admin/avatar_default.svg';

const initialForm = {
  login: '',
  old_login: '',
  password: '',
  old_password: '',
  fio: '',
  avatar: '',
  social_media: '',
};

export default function Profile({ resetSection }) {
  const { currentUser } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ...initialForm,
    avatar: currentUser.avatar,
  });
  const [modal, setModal] = useState('');
  const [canAdd, setCanAdd] = useState(false);
  const inputRef = useRef(null);
  const isFormReady = Object.keys(formData).some(
    (key) =>
      (key === 'avatar' && formData[key] !== currentUser.avatar) ||
      (key !== 'avatar' && formData[key])
  );

  function handleFormSubmit(evt) {
    evt.preventDefault();
    const filledData = Object.keys(formData).reduce((acc, key) => {
      if (
        (key === 'avatar' && formData[key] !== currentUser.avatar) ||
        (key !== 'avatar' && formData[key])
      )
        acc[key] = formData[key];
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
          });
        }
      })
      .catch((err) => console.warn(err));
  }

  function changeForm(data) {
    setFormData((prev) => ({ ...prev, ...data }));
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
            <span className="profile__sub-title">Фамилия, имя, отчество</span>
            <InputEditable
              type={'text'}
              value={formData.fio || currentUser.fio}
              onOpen={() => setModal('fio')}
            />
          </label>

          <div className="profile__field">
            <span className="profile__sub-title">Социальные сети</span>
            <SocialsBar onOpen={() => setModal('addSocials')} />
          </div>

          <label className="profile__field">
            <span className="profile__sub-title">Логин</span>
            <InputEditable
              type={'text'}
              value="**********"
              onOpen={() => setModal('login')}
            />
          </label>

          <label className="profile__field">
            <span className="profile__sub-title">Пароль</span>
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
          Сохранить
        </Button>
        <Button
          type={'button'}
          disabled={!isFormReady}
          onClick={() => setFormData(initialForm)}
        >
          Отменить
        </Button>
      </div>
      <ModalFIO
        isOpen={modal === 'fio'}
        onClose={() => setModal('')}
        onSave={changeForm}
        title="Изменить ФИО"
      />
      <ModalLogPass
        isOpen={modal === 'login' || modal === 'password'}
        onClose={() => setModal('')}
        onSave={changeForm}
        name={modal === 'password' ? modal : 'login'}
      />
      <ModalSocials
        isOpen={modal === 'addSocials'}
        onClose={() => setModal('')}
        onSave={changeForm}
        title="Добавить контакт"
      />
      <Modal
        title="Ссылка на картинку"
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
          placeholder="https://site.com/image.jpg"
          className="input-reason"
          ref={inputRef}
          onChange={handleInput}
        />
      </Modal>
    </>
  );
}
