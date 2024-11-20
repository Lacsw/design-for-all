import { useSelector } from 'react-redux';
import './Profile.css';
import { Button, SocialsBar, InputEditable } from 'components';
import { useState } from 'react';
import ModalFIO from 'components/Modal/ModalFIO/ModalFIO';
import ModalLogPass from 'components/Modal/ModalLogPass/ModalLogPass';
import authApi from 'utils/api/auth';

const initialForm = {
  login: '',
  old_login: '',
  password: '',
  old_password: '',
  fio: '',
  avatar: '',
  social_media: '',
};

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);
  const [formData, setFormData] = useState(initialForm);
  const [modal, setModal] = useState('');
  const isFormReady = Object.values(formData).some(Boolean);
  
  function handleFormSubmit(evt) {
    evt.preventDefault();
    const filledData = Object.keys(formData).reduce((acc, key) => {
      if (formData[key]) acc[key] = formData[key];
      return acc;
    }, {});
    authApi.updateUser(filledData)
      .then(() => console.log('OK'))
      .catch((err) => console.log(err));
  }

  function changeForm(data) {
    setFormData((prev) => ({ ...prev, ...data }));
  }
  console.log(formData);
  return (
    <section className="profile">
      <div className="profile__container">
        <form
          className="profile__form"
          id="profile-form"
          onSubmit={handleFormSubmit}
        >
          <img
            src={formData.avatar || currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
            onClick={() => setModal('avatar')}
          />

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
              <SocialsBar />
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
    </section>
  );
}
