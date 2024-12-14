import { useDispatch } from 'react-redux';
import { setDecision } from 'store/slices';
import './AccountsDecision.css';
import { useEffect } from 'react';

const AccountsDecision = ({ info, uuid }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setDecision({ uuid }));
  }, [dispatch, uuid]);

  return (
    <section className="decision-account">
      <h2 className="decision-account__title">Заявка регистрации автора</h2>
      <h3 className="decision-account__subtitle">Ссылки на проекты</h3>
      <div className="decision-account__links-group">
        {info.link_projects.map((link) => {
          let url = link;
          if (!link.startsWith('http')) url = '//' + link;
          return (
            <a
              href={url}
              key={link}
              className="decision-account__link"
              target="_blank"
              rel="noreferrer"
            >
              {link}
            </a>
          );
        })}
      </div>
      <h2 className="decision-account__title">
        Инструкция по проверке квалификации автора
      </h2>
      <ol className="decision-account__instruction">
        <li>
          Если сомневаетесь в безопасности ссылок, не открывайте их или
          открывайте в режиме "Инкогнито" браузера, это защитит ваши данные от
          предполагаемых вредоносных действий злоумышленников. Это относится и к
          сокращённым ссылкам типа: <u>https://go.gl/k12jh3k1j2h</u>, и другим.
        </li>
        <li>
          На проверку 1 ссылки тратьте не более 30-60 секунд. Система
          автоматически не допускает дублирования ссылок на проекты и аккаунты
          авторов, по этому они не могут дублироваться.
        </li>
        <li>
          Обращайте внимание на качество оформления аккаунта, если ссылка на
          соц. сеть автора. Если на проект, например в Figma, обращайте внимание
          на присутствие ключевых секций типа UI-kit, section's, component's,
          name space's и другое.
        </li>
        <li>
          Если вы не уверены в компетентности автора, но вам нравится его UI
          оформление проектов, склоняйтесь к положительному решению, возможно, у
          автора маленький опыт в UX, но большой в UI.
        </li>
        <li>
          Если у автора много подписчиков/последователей, возможно, стоит
          принять положительное решение, не смотря на компетенции автора. Это
          может принести много новых пользователей проекту.
        </li>
        <li>
          Если вы впечатлились графикой автора по ссылке на проект/ресурс, не
          спешите принимать положительное решение, так как графика может быть
          других людей, например коллег автора, с которыми он работает.
        </li>
        <li>
          Все создания и отклонения аккаунтов авторов логгируются и проверяются
          более опытными участниками, будьте внимательны при принятии решений.
        </li>
      </ol>
    </section>
  );
};

export default AccountsDecision;
