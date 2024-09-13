import { useSearchParams } from 'react-router-dom';
import { Button } from 'components';
import './NoAccess.css';

const NoAccess = ({ hash }) => {
  const [, setSearchParams] = useSearchParams();
  const openModal = (evt) => {
    if (evt.target.textContent === 'Войти') {
      setSearchParams({ 'modal-auth': 'login' });
    } else {
      setSearchParams({ 'modal-auth': 'signUp' });
    }
  };

  return (
    <section className="no-access">
      <h2 className="no-access__text">
        Этот раздел доступен только авторизованным пользователям.
      </h2>
      <div className="no-access__actions-container">
        <Button
          type="button"
          theme="bright"
          extraClass="no-access__button"
          onClick={openModal}
        >
          Войти
        </Button>
        <Button
          type="button"
          theme="bright"
          extraClass="no-access__button"
          onClick={openModal}
        >
          Регистрация
        </Button>
      </div>
    </section>
  );
};

export default NoAccess;
