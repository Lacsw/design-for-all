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
import { getCurrentTheme, getDraft } from 'store/selectors';
import { useLocation, useNavigate } from 'react-router-dom';
import { authorArticlesTabs, hashPaths } from 'utils/constants';

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

const icons = {
  cancel: {
    dark: cancelIconW,
    light: cancelIconB
  },
  back: {
    dark: backIconW,
    light: backIconB
  }
};

export default function NewArticleNavbar() {
  const location = useLocation();
  const theme = useSelector(getCurrentTheme);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const draft = useSelector(getDraft);
  const navigate = useNavigate();
  const handleCancelClick = () => {
    setIsOpenModal(!isOpenModal);
  };
  const status = authorArticlesTabs.find(
    (item) => item.value === location.state?.section
  )?.name;
  const publishDisabled = Object.values(draft).some((item) => !item);
  const draftDisabled = location.state ? !draft.lang : !draft.lang || !draft.main_category;
  const buttonsNames = defineNames(location.state);
  const icon = location.state?.name === 'view' ? icons.back[theme] : icons.cancel[theme];

  function handleSave({ target }) {
    const onlyId = draft.recommend_from_creator.map((item) => item.uuid);
    const modDraft = {
      ...draft,
      image: '',
      recommend_from_creator: onlyId,
    };
    if (target.name !== 'update_draft') delete modDraft.uuid;
    authorApi
      .addCreation(target.name, modDraft)
      .then(() => navigate(hashPaths.articles))
      .catch((err) => console.log(err));
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
          <button
            className="link-button"
            onClick={() => navigate(-1)}
          >
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
