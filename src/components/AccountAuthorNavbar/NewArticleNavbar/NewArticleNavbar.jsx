import { useState } from 'react';

import './NewArticleNavbar.css';
import publishIcon from 'images/account/publish-icon.svg';
import saveDraftIcon from 'images/account/save-draft-icon.svg';
import cancelIconW from 'images/account/cancel-icon.svg';
import cancelIconB from 'images/account/cancel-icon_black.svg';
import backIconW from 'images/account/logout-icon.svg';
import backIconB from 'images/account/logout-icon_black.svg';
import { ModalAttention } from 'components';
import authorApi from 'utils/api/author';
import { useSelector } from 'react-redux';
import { getCurrentTheme, getDraft, getOriginal } from 'store/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { authorArticlesTabs, hashPaths } from 'utils/constants';
import previewImage from 'images/article/preview.png';

function defineNames(state) {
  if (!state) return ['create_new', 'create_draft'];
  const names = [];
  if (state.type === 'updated') names[0] = 'create_update';
  if (state.type === 'created_lang') names[0] = 'create_update_lang';
  if (state.type === 'created') names[0] = 'create_new';
  if (state.name === 'edit') {
    names[1] = 'update_draft';
  } else names[1] = 'create_draft';
  return names;
}

function canSave(state, draft, original) {
  if (state?.type === 'updated' || state?.name === 'edit') {
    if (
      original.recommend_from_creator.length !==
      draft.recommend_from_creator.length
    )
      return true;
    return Object.keys(original).some(
      (key) => key !== 'recommend_from_creator' && original[key] !== draft[key]
    );
  }
  return draft.lang && draft.main_category;
}

function canPublish(state, draft, original) {
  if (state?.type === 'updated') {
    if (
      original.recommend_from_creator.length !==
      draft.recommend_from_creator.length
    )
      return true;
    return Object.keys(original).some(
      (key) => key !== 'recommend_from_creator' && original[key] !== draft[key]
    );
  }
  return !Object.values(draft).some((item) => !item);
}

const icons = {
  cancel: {
    dark: cancelIconW,
    light: cancelIconB,
  },
  back: {
    dark: backIconW,
    light: backIconB,
  },
};

export default function NewArticleNavbar({ onChange }) {
  const location = useLocation();
  const theme = useSelector(getCurrentTheme);
  const original = useSelector(getOriginal);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const draft = useSelector(getDraft);
  const navigate = useNavigate();
  const handleCancelClick = () => {
    setIsOpenModal(!isOpenModal);
  };
  const status = authorArticlesTabs.find(
    (item) => item.value === location.state?.section
  )?.name;
  const publishDisabled = !canPublish(location.state, draft, original);
  const draftDisabled = !canSave(location.state, draft, original);
  const buttonsNames = defineNames(location.state);
  const icon =
    location.state?.name === 'view' ? icons.back[theme] : icons.cancel[theme];

  function handleSave({ target }) {
    const onlyId = draft.recommend_from_creator.map((item) => item.uuid);
    const modDraft = {
      ...draft,
      recommend_from_creator: onlyId,
    };

    if (
      (location.state && location.state.type !== 'created') ||
      target.name === 'update_draft'
    )
      delete modDraft.main_category;

    if (target.name === 'update_draft') {
      delete modDraft.lang;
      delete modDraft.what_update;
      delete modDraft.what_update_lang;
    } else delete modDraft.uuid;

    if (location.state?.type === 'updated' || target.name === 'update_draft') {
      Object.keys(original).forEach((key) => {
        if (original[key] === modDraft[key]) delete modDraft[key];
      });
      original.recommend_from_creator.length ===
        modDraft.recommend_from_creator.length &&
        delete modDraft.recommend_from_creator;
    } else {
      Object.keys(modDraft).forEach(
        (key) => !modDraft[key] && delete modDraft[key]
      );
      target.name === 'create_draft' &&
        !modDraft.recommend_from_creator.length &&
        delete modDraft.recommend_from_creator;
    }

    if (modDraft.image) modDraft.image = previewImage;
    if (modDraft.sub_category) {
      let correct = modDraft.sub_category.trim();
      !correct.startsWith('/') && (correct = '/' + correct);
      modDraft.sub_category = correct;
    }

    authorApi
      .addCreation(target.name, modDraft)
      .then(() => {
        target.name.includes('draft')
          ? onChange('drafted')
          : onChange('offered');
        navigate(hashPaths.articles);
      })
      .catch((err) => console.warn(err));
  }

  return (
    <nav className="new-article-navbar">
      <ul className="new-article-navbar__list">
        {location.state?.name === 'view' ? (
          <li>
            <p className="new-article-navbar__status">Статус: {status}</p>
          </li>
        ) : (
          <>
            <li>
              <button
                className="link-button"
                name={buttonsNames[0]}
                onClick={handleSave}
                disabled={publishDisabled}
              >
                <img src={publishIcon} alt="" />
                Опубликовать
              </button>
            </li>

            <li>
              <button
                className="link-button"
                name={buttonsNames[1]}
                onClick={handleSave}
                disabled={draftDisabled}
              >
                <img src={saveDraftIcon} alt="Сохранить" />
                Сохранить в черновик
              </button>
            </li>
          </>
        )}
        <li>
          <button className="link-button" onClick={() => navigate(-1)}>
            <img src={icon} alt="Вернуться" />
            {location.state?.name === 'view' ? 'Назад' : 'Отменить'}
          </button>
        </li>
      </ul>
      <ModalAttention
        isOpen={isOpenModal}
        onClose={handleCancelClick}
        title="Внимание!"
      />
    </nav>
  );
}
