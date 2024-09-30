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

  function handleSave() {
    const withFake = { ...draft, image: 'test.jpg' };
    authorApi
      .createDraft(withFake)
      .then(() => dispatch(resetDraft()))
      .then(() => navigate(hashPaths.articles))
      .catch((err) => console.log(err));
  }

  return (
    <nav className="new-article-navbar">
      <ul className="new-article-navbar__list">
        <li>
          <button className="link-button">
            <img src={publishIcon} alt="" />
            Опубликовать
          </button>
        </li>

        <li>
          <button className="link-button" onClick={handleSave}>
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
