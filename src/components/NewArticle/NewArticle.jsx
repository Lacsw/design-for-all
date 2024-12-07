import { useMemo, useRef, useState } from 'react';
import './NewArticle.css';
import plus from 'images/plus-icon.svg';
import deleteIconW from 'images/delete-icon_white.svg';
import deleteIconB from 'images/delete-icon_black.svg';
import editIconW from 'images/edit-icon_white.svg';
import editIconB from 'images/edit-icon_black.svg';
import { Dropdown, ModalRecommendation, RichTextEditor } from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { changeDraft } from 'store/slices';
import { getCurrentTheme, getIsThemeLight } from 'store/selectors';
import Recommend from 'components/Recommendations/Recommend';
import { selectTitles } from 'store/slices/articleSlice';
import { Link, useLocation } from 'react-router-dom';

function createTitle(type) {
  if (type === 'updated') return 'Внесение правок';
  if (type === 'created_lang') return 'Перевод статьи';
  return 'Создание новой статьи';
}

export default function NewArticle({ langsList, rejectFields, draft }) {
  const dispatch = useDispatch();
  const location = useLocation();

  const theme = useSelector(getCurrentTheme);
  const isLight = useSelector(getIsThemeLight);

  const categories = useSelector(selectTitles);
  const [isShownAddRec, setIsShownAddRec] = useState(false);
  const editId = useRef('');

  const isUpdate =
    location.state?.type === 'updated' ||
    location.state?.type === 'created_lang';

  const mainTitle = createTitle(location.state?.type);

  const titlesList = useMemo(() => {
    if (!draft.lang) return [];
    const langTitles = categories[draft.lang];
    const titlesForDropdown = Object.values(langTitles).map((title) => ({
      value: title,
      label: title,
    }));
    return titlesForDropdown;
  }, [draft.lang, categories]);

  const toggleRecommendation = () => {
    setIsShownAddRec(!isShownAddRec);
  };

  function addFile({ target }) {
    const reader = new FileReader();
    if (target.files.length) {
      reader.onload = () => changeField('image', reader.result);
      reader.readAsDataURL(target.files[0]);
    }
  }

  function handleDelete(evt, id) {
    evt.preventDefault();
    const recommends = draft.recommend_from_creator.filter(
      (rec) => rec.uuid !== id
    );
    changeField('recommend_from_creator', recommends);
  }

  function handleEdit(evt, id) {
    evt.preventDefault();
    editId.current = id;
    toggleRecommendation();
  }

  function handleClose() {
    editId.current = '';
    toggleRecommendation();
  }

  function changeField(name, value) {
    dispatch(changeDraft({ name, value }));
  }

  const classes = useMemo(
    () => ({
      button: !isLight ? 'inverted' : undefined,
    }),
    [isLight]
  );

  return (
    <section className="new-article">
      <h2 className="new-article__title">{mainTitle}</h2>
      <form action="">
        <label
          className={`new-article__label${
            location.state?.name === 'translate' || !location.state
              ? ''
              : ' new-article__label_disabled'
          }`}
        >
          <span className="new-article__sub-title">Язык</span>
          <Dropdown
            id={'lang'}
            name={'lang'}
            options={langsList}
            title={draft.lang || 'Выбор'}
            onChange={changeField}
          />
        </label>

        {!isUpdate && (
          <label
            className={`new-article__label${
              draft.lang && location.state?.name !== 'edit'
                ? ''
                : ' new-article__label_disabled'
            }`}
          >
            <span className="new-article__sub-title">Основная категория</span>
            <Dropdown
              id={'main_category'}
              name={'category'}
              options={titlesList}
              title={draft.main_category || 'Выбор'}
              onChange={changeField}
            />
          </label>
        )}

        <label
          className={`${
            rejectFields.includes('sub_category') ? 'rejected ' : ''
          }new-article__label${
            draft.main_category || (isUpdate && draft.lang)
              ? ''
              : ' new-article__label_disabled'
          }`}
        >
          <span className="new-article__sub-title">Подкатегория</span>
          <input
            disabled={
              draft.main_category || (isUpdate && draft.lang) ? false : true
            }
            type="text"
            name="sub_category"
            placeholder="страна/город/улица/дом"
            id="sub_category"
            className="new-article__input"
            size={32}
            value={draft.sub_category}
            onChange={(evt) => changeField('sub_category', evt.target.value)}
          />
        </label>

        <label
          className={`${
            rejectFields.includes('image') ? 'rejected ' : ''
          }new-article__label${
            draft.main_category || (isUpdate && draft.lang)
              ? ''
              : ' new-article__label_disabled'
          }`}
        >
          <span className="new-article__sub-title">Картинка статьи</span>
          <input
            disabled={
              draft.main_category || (isUpdate && draft.lang) ? false : true
            }
            type="file"
            name="main-image"
            id="main-image"
            className="new-article__main-image"
            accept=".jpg, .png"
            onChange={addFile}
          />
          {draft.image && (
            <img
              className="new-article__img"
              src={draft.image}
              alt="Ваша картинка"
            />
          )}
        </label>

        <label
          className={`${
            rejectFields.includes('title') ? 'rejected ' : ''
          }new-article__label${
            draft.main_category || (isUpdate && draft.lang)
              ? ''
              : ' new-article__label_disabled'
          }`}
        >
          <span className="new-article__sub-title">Заголовок статьи</span>
          <input
            disabled={
              draft.main_category || (isUpdate && draft.lang) ? false : true
            }
            type="text"
            name="article-title"
            id="article-title"
            className="new-article__input new-article__input_article-header"
            placeholder="Карточка товара в маркетплейсе"
            value={draft.title}
            onChange={(evt) => changeField('title', evt.target.value)}
          />
        </label>

        <label
          className={`${
            rejectFields.includes('description') ? 'rejected ' : ''
          }new-article__label${
            draft.main_category || (isUpdate && draft.lang)
              ? ''
              : ' new-article__label_disabled'
          }`}
        >
          <span className="new-article__sub-title">Контент статьи</span>
          <RichTextEditor
            className="new-article__input new-article__input_article-content new-article__rte"
            id="article-content"
            classes={classes}
            initialValue={draft.description}
            readOnly={
              draft.main_category || (isUpdate && draft.lang) ? false : true
            }
          />
        </label>

        <div
          className={`${
            rejectFields.includes('recommend_from_creator') ? 'rejected ' : ''
          }new-article__label${
            draft.main_category || (isUpdate && draft.lang)
              ? ''
              : ' new-article__label_disabled'
          }`}
        >
          <span className="new-article__sub-title">Рекомендации авторов</span>
          <div className="new-article__recommendations">
            <button
              disabled={
                draft.main_category || (isUpdate && draft.lang) ? false : true
              }
              className="new-article__recommendations-btn"
              type="button"
              onClick={toggleRecommendation}
            >
              <img src={plus} alt="Иконка добавления рекомендации" />
              <span className="new-article__recommendations-tip">Добавить</span>
            </button>
            <ul className="recommendations__list">
              {draft.recommend_from_creator.map((item) => (
                <li className="recommendations__item" key={item.uuid}>
                  <Link
                    to={`${draft.lang}/${item.uuid}`}
                    target="_blank"
                    className="new-article__link"
                  >
                    <div className="rec-overlay">
                      <img
                        src={theme === 'light' ? editIconB : editIconW}
                        alt="Изменить рекомендацию"
                        className="rec-overlay__img"
                        onClick={(evt) => handleEdit(evt, item.uuid)}
                      />
                      <img
                        src={theme === 'light' ? deleteIconB : deleteIconW}
                        alt="Удалить рекомендацию"
                        className="rec-overlay__img"
                        onClick={(evt) => handleDelete(evt, item.uuid)}
                      />
                    </div>

                    <Recommend imageUrl={item.image} title={item.title} />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </form>
      <ModalRecommendation
        isOpen={isShownAddRec}
        onClose={handleClose}
        onSave={changeField}
        title={
          editId.current ? 'Заменить рекомендацию' : 'Добавить рекомендацию'
        }
        editId={editId.current}
      />
    </section>
  );
}
