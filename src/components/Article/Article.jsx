import { Link } from 'react-router-dom';

import './Article.css';
import previewImage from 'images/article/preview.png';
import image1 from 'images/article/image-1.png';
import { ArticleHeader } from 'components';

export default function Article({ data }) {
  return data.author && data.author !== 'template' ? (
    <div className="article__text">{data.publication.description}</div>
  ) : (
    <div className="article">
      <div className="article__container">
        <Link to="ru/2a78df4073ecf0e3b045f6f7ed76b6f6">
          Перейти на реальную статью
        </Link>
        <Link to="ru/2a78df4073ecf0e3b045f6f7ed76b6f67">
          Перейти на несуществующую статью
        </Link>
        <ArticleHeader
          title={'Вэб-дизайн'}
          timeCreate={'3 ноября 2022'}
          timeUpdate={'23 февраля 2023 (3 дня назад)'}
        />
        <div className="article__main">
          <img src={previewImage} alt="превью" className="article__image" />
          <p className="article__text">
            Создание правильных взаимодействий и стилей для ваших кнопок
            является одной из наиболее важных частей процесса. Каждое состояние
            должно иметь четкие аффордансы, которые отличают его от других
            состояний и окружающего макета, но не должны радикально изменять
            компонент или создавать много визуального шума.
          </p>
          <img src={image1} alt="превью" className="article__image" />
          <p className="article__text">
            Эту рекомендацию следует применять для любого компонента. Размер
            целевой области был одним из факторов, влияющих на доступность. К
            другим факторам относятся{' '}
            <a href="/" target="_blank" rel="noreferrer">
              размер шрифта
            </a>
            , цвет и контраст. Существует множество инструментов, которые
            помогут вам легко проверить, как работают ваши компоненты.
          </p>
          <h2 className="article__subtitle">Виды кнопок</h2>
          <p className="article__text">
            Normal — сообщает, что компонент интерактивен и включен. <br />
            <br />
            Focus — сообщает, что пользователь выделил элемент, используя
            клавиатуру или другой метод ввода. <br />
            <br />
            Hover — сообщает, когда пользователь навел курсор на интерактивный
            элемент. <br />
            <br />
            Active — Активное или нажатое состояние сообщает о том, что
            пользователь нажал на кнопку. <br />
            <br />
            Progress/Loading — используется, когда действие не выполняется
            немедленно и сообщает, что компонент находится в процессе завершения
            действия. <br />
            <br />
            Disabled — сообщает, что компонент в настоящее время не является
            интерактивным, но может быть включен в будущем.
          </p>
        </div>
      </div>
    </div>
  );
}
