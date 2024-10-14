import { useState } from 'react';

import './NewArticleNavbar.css';
import publishIcon from 'images/account/publish-icon.svg';
import saveDraftIcon from 'images/account/save-draft-icon.svg';
import cancelIcon from 'images/account/cancel-icon.svg';
import { ModalAttention } from 'components';
import authorApi from 'utils/api/author';
import { useSelector, useDispatch } from 'react-redux';
import { getDraft } from 'store/selectors';
import { useNavigate } from 'react-router-dom';
import { hashPaths } from 'utils/constants';
import { resetDraft } from 'store/slices';

export default function NewArticleNavbar() {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const draft = useSelector(getDraft);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleCancelClick = () => {
    setIsOpenModal(!isOpenModal);
  };
  const publishDisabled = Object.values(draft).some(item => !item);
  const draftDisabled = !draft.lang;

  function handleSave({target}) {
    const onlyId = draft.recommend_from_creator.map((item) => item.id);
    const modDraft = {
      ...draft,
      image: 'test.jpg',
      recommend_from_creator: onlyId,
    };
    authorApi
      .createNew(target.name, modDraft)
      .then(() => dispatch(resetDraft()))
      .then(() => navigate(hashPaths.articles))
      .catch((err) => console.log(err));
  }

  return (
    <nav className="new-article-navbar">
      <ul className="new-article-navbar__list">
        <li>
          <button className="link-button" name="new" onClick={handleSave} disabled={publishDisabled}>
            <img src={publishIcon} alt="" />
            Опубликовать
          </button>
        </li>

        <li>
          <button className="link-button" name="draft" onClick={handleSave} disabled={draftDisabled}>
            <img src={saveDraftIcon} alt="Сохранить" />
            Сохранить в черновик
          </button>
        </li>

        <li>
          <button
            className="link-button"
            onClick={() => dispatch(resetDraft())}
          >
            <img src={cancelIcon} alt="" />
            Отменить
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
