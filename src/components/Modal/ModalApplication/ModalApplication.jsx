import './ModalApplication.css';
import checkBlack from 'images/check-black.svg';

export default function ModalApplication() {
  return (
    <div className="application">
      <div className="application__container">
        <h2 className="application__title">Заявка отправлена!</h2>
        <p className="application__text">
          Заявка на регистрацию аккаунта успешна отправлена.
        </p>
        <p className="application__text">
          Компетенции каждого автора проверяются администраторами вруную по
          предоставленым ссылкам на проекты. Неопытные участники к авторству не
          допускаются.
        </p>
        <p className="application__text">
          После отклонения или одобрения заявки, вы получите уведомление по
          адресу:{' '}
          <a href="/" className="application__link">
            example@example.com
          </a>
        </p>
        <button className="application__button">
          <img src={checkBlack} alt="Галочка" />
        </button>
      </div>
    </div>
  );
}
