import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { languageList } from 'utils/constants';
import { useSelector } from 'react-redux';
import { selectArticle } from 'store/slices/articleSlice';
import './DropdownLanguage.css';

const DropdownLanguage = () => {
  const navigate = useNavigate();
  const { lang, articleId } = useParams();
  const { languages } = useSelector(selectArticle);
  const [isOpen, setIsOpen] = useState(false);
  const flag = languageList.find((item) => item.name === lang);
  const otherFlags = languageList.filter((item) => item.name !== lang);
  const flagList = isOpen ? [flag, ...otherFlags] : [flag];

  return (
    <div
      className="article-header__lang-wrapper"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <ul className="flag-list">
        {flagList.map((flag) => {
          const extraClass = !languages.includes(flag.name)
            ? ' flag-list__item_disabled'
            : '';
          return (
            <li
              className={'flag-list__item' + extraClass}
              key={flag.name}
              onClick={() =>
                navigate(`../../${flag.name}/${articleId}`, {
                  relative: 'path',
                })
              }
            >
              <img className="flag" src={flag.src} alt={flag.name} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default DropdownLanguage;
