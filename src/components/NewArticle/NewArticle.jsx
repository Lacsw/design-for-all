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
  ImageWithFallback,
} from 'components';
import { useSelector, useDispatch } from 'react-redux';
import { changeDraft } from 'store/slices/user';
import { getCurrentTheme, getIsThemeLight } from 'store/slices/theme';
import Recommend from 'components/Recommendations/Recommend';
import { selectTitles } from 'store/slices/article';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';
import useSubCategoryCheck from 'utils/hooks/useSubCategoryCheck';
import { useDebounce } from 'utils/hooks/useDebounce';
import { useTranslation } from 'react-i18next';
import { CREATION } from 'utils/translationKeys';
import { setShouldRemountTree, setMainCategory } from 'store/slices/catalog/slice';

function createTitle(type, t) {
  if (type === 'updated') return t(CREATION.NEW_ARTICLE.UPDATED_TITLE);
  if (type === 'created_lang') return t(CREATION.NEW_ARTICLE.CREATED_LANG_TITLE);
  return t(CREATION.NEW_ARTICLE.CREATED_TITLE);
}

export const NewArticle = memo(function NewArticle({
  langsList,
  rejectFields,
  draft,
}) {
  const dispatch = useDispatch();
  const location = useLocation();
  const { t } = useTranslation();

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

  const mainTitle = createTitle(location.state?.type, t);

  const titlesList = useMemo(() => {
    if (!draft.lang) return [];
    const langTitles = categories[draft.lang];
    const titlesForDropdown = Object.values(langTitles).map((title) => ({
      value: title,
      label: title,
    }));
    return titlesForDropdown;
  }, [draft.lang, categories]);

  // Создаем переведенные опции для выпадающего списка языков
  const translatedLangsList = useMemo(() => {
    return langsList.map(lang => ({
      ...lang,
      label: t(lang.label)
    }));
  }, [langsList, t]);

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
  const { hint, uuid, checkSubCategory, clearHint } = useSubCategoryCheck(
    draft.lang
  );

  // Создаем callback для проверки
  const checkCallback = useCallback((value) => {
    if (value.trim() !== '') {
      checkSubCategory(value.trim());
    }
  }, [checkSubCategory]);

  // Используем существующий хук useDebounce
  const debouncedCheckSubCategory = useDebounce(checkCallback, 500, true);

  // Обработчик onChange для подкатегории:
  const handleSubCategoryChange = useCallback(
    (evt) => {
      const value = evt.target.value;
      // Обновляем значение поля
      changeField('sub_category', value);
      // Сбрасываем предыдущий hint сразу при изменении
      clearHint();
      // Запускаем проверку с задержкой через debounced-колбэк
      debouncedCheckSubCategory(value);
    },
    [changeField, clearHint, debouncedCheckSubCategory]
  );

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

  /** @type {import('components/RichTextEditor/types').TRteOnInputProp} */
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

  const handleSubCategoryLinkClick = () => {
    dispatch(setMainCategory(draft.main_category));
    dispatch(setShouldRemountTree(true));
  };

  return (
    <section className="new-article">
      <h2 className="new-article__title">{mainTitle}</h2>
      <form action="">
        <label
          className={`new-article__label${location.state?.name === 'translate' || !location.state
              ? ''
              : ' new-article__label_disabled'
            }`}
        >
          <span className="new-article__sub-title">{t(CREATION.NEW_ARTICLE.LANG_TITLE)}</span>
          <Dropdown
            id={'lang'}
            name={'lang'}
            options={translatedLangsList}
            title={draft.lang || t(CREATION.NEW_ARTICLE.DROPDOWN.SELECT)}
            onChange={changeField}
          />
        </label>

        {!isUpdate && (
          <label
            className={`new-article__label${draft.lang && location.state?.name !== 'edit'
                ? ''
                : ' new-article__label_disabled'
              }`}
          >
            <span className="new-article__sub-title">{t(CREATION.NEW_ARTICLE.MAIN_CATEGORY_TITLE)}</span>
            <Dropdown
              id={'main_category'}
              name={'category'}
              options={titlesList}
              title={draft.main_category || t(CREATION.NEW_ARTICLE.DROPDOWN.SELECT)}
              onChange={changeField}
            />
          </label>
        )}

        <label
          className={`${rejectFields.includes('sub_category') ? 'rejected ' : ''
            }new-article__label${draft.main_category && draft.lang
              ? ''
              : ' new-article__label_disabled'
            }`}
        >
          <span className="new-article__sub-title">{t(CREATION.NEW_ARTICLE.SUB_CATEGORY_TITLE)}</span>
          {hint && (
            <Hint>
              <span>
                {hint}{' '}
                {uuid && (
                  <Link 
                    target="_blank" 
                    to={`/${draft.lang}/${uuid}`}
                    onClick={handleSubCategoryLinkClick}
                  >
                    {t(CREATION.NEW_ARTICLE.CHECK_SUB_CATEGORY_HINT_LINK)}
                  </Link>
                )}
              </span>
            </Hint>
          )}
          <input
            disabled={draft.main_category && draft.lang ? false : true}
            type="text"
            name="sub_category"
            placeholder={t(CREATION.NEW_ARTICLE.SUB_CATEGORY_PLACEHOLDER)}
            id="sub_category"
            className="new-article__input"
            size={32}
            value={draft.sub_category}
            onChange={handleSubCategoryChange}
          />
        </label>

        <label
          className={`${rejectFields.includes('image') ? 'rejected ' : ''
            }new-article__label${draft.main_category && draft.lang
              ? ''
              : ' new-article__label_disabled'
            }`}
        >
          <span className="new-article__sub-title">{t(CREATION.NEW_ARTICLE.IMAGE_TITLE)}</span>
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
            <div className="new-article__image-container">
              <ImageWithFallback
                className="new-article__img"
                src={draft.image}
                alt={t(CREATION.NEW_ARTICLE.IMAGE_ALT)}
                fallbackClassName="new-article__image-placeholder"
                fallbackAlt={t(CREATION.NEW_ARTICLE.IMAGE_FALLBACK_ALT)}
              />
            </div>
          )}
        </label>

        <label
          className={`${rejectFields.includes('title') ? 'rejected ' : ''
            }new-article__label${draft.main_category && draft.lang
              ? ''
              : ' new-article__label_disabled'
            }`}
        >
          <span className="new-article__sub-title">{t(CREATION.NEW_ARTICLE.ARTICLE_TITLE)}</span>
          <input
            disabled={draft.main_category && draft.lang ? false : true}
            type="text"
            name="article-title"
            id="article-title"
            className="new-article__input new-article__input_article-header"
            placeholder={t(CREATION.NEW_ARTICLE.TITLE_PLACEHOLDER)}
            value={draft.title}
            onChange={(evt) => changeField('title', evt.target.value)}
          />
        </label>

        <label
          className={`${rejectFields.includes('description') ? 'rejected ' : ''
            }new-article__label${draft.main_category && draft.lang
              ? ''
              : ' new-article__label_disabled'
            }`}
        >
          <span className="new-article__sub-title">{t(CREATION.NEW_ARTICLE.CONTENT_TITLE)}</span>
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
          className={`${rejectFields.includes('recommend_from_creator') ? 'rejected ' : ''
            }new-article__label${draft.main_category && draft.lang
              ? ''
              : ' new-article__label_disabled'
            }`}
        >
          <span className="new-article__sub-title">{t(CREATION.NEW_ARTICLE.RECOMMENDATIONS_TITLE)}</span>
          <div className="new-article__recommendations">
            <button
              disabled={draft.main_category && draft.lang ? false : true}
              className="new-article__recommendations-btn"
              type="button"
              onClick={toggleRecommendation}
            >
              <img src={plus} alt={t(CREATION.NEW_ARTICLE.RECOMMENDATIONS_ADD_BTN_ALT)} />
              <span className="new-article__recommendations-tip">{t(CREATION.NEW_ARTICLE.RECOMMENDATIONS_ADD_BTN_TITLE)}</span>
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
                        alt={t(CREATION.NEW_ARTICLE.RECOMMENDATIONS_EDIT_BTN_ALT)}
                        className="rec-overlay__img"
                        onClick={(evt) => handleEdit(evt, item.uuid)}
                      />
                      <img
                        src={theme === 'light' ? deleteIconB : deleteIconW}
                        alt={t(CREATION.NEW_ARTICLE.RECOMMENDATIONS_DELETE_BTN_ALT)}
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
          editId.current ? t(CREATION.NEW_ARTICLE.MODAL_RECOMMENDATIONS.CHANGE_BTN_TITLE) : t(CREATION.NEW_ARTICLE.MODAL_RECOMMENDATIONS.ADD_BTN_TITLE)
        }
        editId={editId.current}
      />
      <Modal
        title={t(CREATION.NEW_ARTICLE.MODAL_RECOMMENDATIONS.IMAGE_TITLE)}
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
          placeholder={t(CREATION.NEW_ARTICLE.MODAL_RECOMMENDATIONS.INPUT_IMAGE_PLACEHOLDER)}
          className="input-reason"  
          ref={inputRef}
          onChange={handleInput}
        />
      </Modal>
    </section>
  );
});
