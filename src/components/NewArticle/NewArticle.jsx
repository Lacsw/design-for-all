import { memo, useCallback, useMemo, useRef, useState } from 'react';
import './NewArticle.css';
import plus from 'images/plus-icon.svg';
import deleteIconW from 'images/delete-icon_white.svg';
import deleteIconB from 'images/delete-icon_black.svg';
import editIconW from 'images/edit-icon_white.svg';
import editIconB from 'images/edit-icon_black.svg';
import {
  Dropdown,
  ModalRecommendation,
  RichTextEditor,
  Modal,
  Hint,
} from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { changeDraft } from 'store/slices';
import { getCurrentTheme, getIsThemeLight } from 'store/selectors';
import Recommend from 'components/Recommendations/Recommend';
import { selectTitles } from 'store/slices/articleSlice';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import useSubCategoryCheck from 'utils/hooks/useSubCategoryCheck';

function createTitle(type) {
  if (type === 'updated') return 'Внесение правок';
  if (type === 'created_lang') return 'Перевод статьи';
  return 'Создание новой статьи';
}

export const NewArticle = memo(function NewArticle({
  langsList,
  rejectFields,
  draft,
}) {
  const dispatch = useDispatch();
  const location = useLocation();

  const theme = useSelector(getCurrentTheme);
  const isLight = useSelector(getIsThemeLight);

  const categories = useSelector(selectTitles);
  const [isShownAddRec, setIsShownAddRec] = useState(false);
  const [imgModal, setImgModal] = useState(false);
  const [canAdd, setCanAdd] = useState(false);
  const inputRef = useRef(null);
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

  const changeField = useCallback(
    (name, value) => {
      dispatch(changeDraft({ name, value }));
    },
    [dispatch]
  );

  // Хук для проверки подкатегории
  const { hint, checkSubCategory, clearHint } = useSubCategoryCheck(
    draft.lang || 'en'
  );

  // Обработчик onChange для поля подкатегории
  const handleSubCategoryChange = (evt) => {
    const value = evt.target.value;
    // Обновляем значение в состоянии 
    changeField('sub_category', value);
    // Сбрасываем ошибку при вводе нового значения
    clearHint();
  };
  
  // Обработчик, при потере фокуса
  const handleSubCategoryBlur = (evt) => {
    const value = evt.target.value.trim();
    if (value) {
      // Проверка при наличии непустого значения
      checkSubCategory(value);
    }
  };

  function handleInput({ target }) {
    if (/^https:\/\/\S+\.\S+$/.test(target.value) && !canAdd) setCanAdd(true);
    if (!/^https:\/\/\S+\.\S+$/.test(target.value) && canAdd) setCanAdd(false);
  }

  /* function addFile({ target }) {
    const reader = new FileReader();
    if (target.files.length) {
      reader.onload = () => changeField('image', reader.result);
      reader.readAsDataURL(target.files[0]);
    }
  } */

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

  /** @type {import('components/RichTextEditor').TJDRteOnInputProp} */
  const handleArticleContentChange = useCallback(
    ({ content, validity }) => {
      changeField('description', content);
    },
    [changeField]
  );

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
            draft.main_category && draft.lang
              ? ''
              : ' new-article__label_disabled'
          }`}
        >
          <span className="new-article__sub-title">Подкатегория</span>
          {hint && (
            <Hint>
              <span>{hint}</span>
            </Hint>
          )}
          <input
            disabled={draft.main_category && draft.lang ? false : true}
            type="text"
            name="sub_category"
            placeholder="страна/город/улица/дом"
            id="sub_category"
            className="new-article__input"
            size={32}
            value={draft.sub_category}
            onChange={handleSubCategoryChange}
            onBlur={handleSubCategoryBlur} 
          />
        </label>

        <label
          className={`${
            rejectFields.includes('image') ? 'rejected ' : ''
          }new-article__label${
            draft.main_category && draft.lang
              ? ''
              : ' new-article__label_disabled'
          }`}
        >
          <span className="new-article__sub-title">Картинка статьи</span>
          {/*<input
            disabled={draft.main_category && draft.lang ? false : true}
            type="file"
            name="main-image"
            id="main-image"
            className="new-article__main-image"
            accept=".jpg, .png"
            onChange={addFile}
          />*/}
          <div
            className="new-article__main-image"
            onClick={
              draft.main_category && draft.lang ? () => setImgModal(true) : null
            }
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
            draft.main_category && draft.lang
              ? ''
              : ' new-article__label_disabled'
          }`}
        >
          <span className="new-article__sub-title">Заголовок статьи</span>
          <input
            disabled={draft.main_category && draft.lang ? false : true}
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
            draft.main_category && draft.lang
              ? ''
              : ' new-article__label_disabled'
          }`}
        >
          <span className="new-article__sub-title">Контент статьи</span>
        </label>
        <RichTextEditor
          id="article-content"
          className={clsx(
            'new-article__rte',
            rejectFields.includes('description') && 'rejected',
            draft.main_category && draft.lang ? '' : 'new-article__rte_disabled'
          )}
          classes={classes}
          initialValue={draft.description}
          onInput={handleArticleContentChange}
          readOnly={draft.main_category && draft.lang ? false : true}
        />

        <div
          className={`${
            rejectFields.includes('recommend_from_creator') ? 'rejected ' : ''
          }new-article__label${
            draft.main_category && draft.lang
              ? ''
              : ' new-article__label_disabled'
          }`}
        >
          <span className="new-article__sub-title">Рекомендации авторов</span>
          <div className="new-article__recommendations">
            <button
              disabled={draft.main_category && draft.lang ? false : true}
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
      <Modal
        title="Ссылка на картинку"
        isOpen={imgModal}
        twoBtns
        onConfirm={() => {
          changeField('image', inputRef.current.value);
          setImgModal(false);
        }}
        onClose={() => setImgModal(false)}
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
    </section>
  );
});
