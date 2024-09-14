import { useState } from 'react';

import './NewArticleNavbar.css';
import publishIcon from 'images/account/publish-icon.svg';
import saveDraftIcon from 'images/account/save-draft-icon.svg';
import cancelIcon from 'images/account/cancel-icon.svg';
import { ModalAttention, LinkButton } from 'components';

export default function NewArticleNavbar() {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const handleCancelClick = () => {
    setIsOpenModal(!isOpenModal);
  };

  return (
    <nav className="new-article-navbar">
      <ul className="new-article-navbar__list">
        <li>
          <LinkButton to="/test" icon={publishIcon}>
            Опубликовать
          </LinkButton>
        </li>

        <li>
          <LinkButton to="/test" icon={saveDraftIcon}>
            Сохранить в черновик
          </LinkButton>
        </li>

        <li>
          <LinkButton to="/test" icon={cancelIcon}>
            Отменить
          </LinkButton>
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
