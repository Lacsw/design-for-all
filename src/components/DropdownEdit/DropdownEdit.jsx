import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { languageList, editList } from 'utils/constants';
import { useSelector } from 'react-redux';
import { selectArticle } from 'store/slices/article';
import './DropdownEdit.css';
import { getCurrentTheme } from 'store/slices/theme';

const DropdownEdit = () => {
  const theme = useSelector(getCurrentTheme);
  const navigate = useNavigate();
  const { lang, articleId } = useParams();
  const { languages } = useSelector(selectArticle);
  const [isOpen, setIsOpen] = useState(false);
  const isDisabled = languages.length === languageList.length;

  return (
    <div
      className="article-header__edit-wrapper"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <ul className="edit-list">
        <li className="edit-list__item">
          <img
            className="edit-list__img"
            src={editList[0][theme]}
            alt={editList[0].name}
          />
        </li>
        {isOpen && (
          <>
            <li
              className="edit-list__item"
              onClick={() =>
                navigate('/#/author/new-article', {
                  state: {
                    name: 'correct',
                    original: articleId,
                    type: 'updated',
                    lang,
                  },
                })
              }
            >
              <img
                className="edit-list__img"
                src={editList[1][theme]}
                alt={editList[1].name}
              />
            </li>
            <li
              className={`edit-list__item${
                isDisabled ? ' edit-list__item_disabled' : ''
              }`}
              onClick={() =>
                navigate('/#/author/new-article', {
                  state: {
                    name: 'translate',
                    original: articleId,
                    type: 'created_lang',
                    lang,
                  },
                })
              }
            >
              <img
                className="edit-list__img"
                src={editList[2][theme]}
                alt={editList[2].name}
              />
            </li>
          </>
        )}
      </ul>
    </div>
  );
};

export default DropdownEdit;
