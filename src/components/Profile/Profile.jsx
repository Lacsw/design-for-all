import { useSelector } from 'react-redux';
import './Profile.css';

import Button from '../Button/Button';
import SocialsBar from '../SocialsBar/SocialsBar';
import FieldEditable from '../FieldEditable/FieldEditable';

export default function Profile() {
  const { currentUser } = useSelector((state) => state.user);

  const handleFormSubmit = (event) => {
    event.preventDefault();
    // TODO: обработать смену данных юзера
  };

  return (
    <section className="profile">
      <div className="profile__container">
        <form
          className="profile__form"
          id="profile-form"
          onSubmit={handleFormSubmit}
        >
          <img
            src={currentUser.avatar}
            alt="Аватар"
            className="profile__avatar"
          />

          <fieldset className="profile__fieldset">
            <label className="profile__field">
              <span className="profile__sub-title">Фамилия, имя, отчество</span>
              <FieldEditable value={currentUser.fio || 'Not your name'} />
            </label>

            <div className="profile__field">
              <span className="profile__sub-title">Социальные сети</span>
              <SocialsBar />
            </div>

            <label className="profile__field">
              <span className="profile__sub-title">Логин</span>
              <FieldEditable value={currentUser.login || 'notyourlogin'} />
            </label>

            <label className="profile__field">
              <span className="profile__sub-title">Пароль</span>
              <FieldEditable value={'**********'} />
            </label>
          </fieldset>
        </form>
        <div className="profile__buttons">
          <Button type={'submit'} relatedForm={'profile-form'} disabled={true}>
            Сохранить
          </Button>
          <Button type={'button'} disabled={true}>
            Отменить
          </Button>
        </div>
      </div>
    </section>
  );
}
