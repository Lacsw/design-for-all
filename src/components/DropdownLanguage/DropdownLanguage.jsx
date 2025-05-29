import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { languageList } from 'utils/constants';
import { useSelector } from 'react-redux';
import { selectArticle } from 'store/slices/article';
import './DropdownLanguage.css';

const DropdownLanguage = () => {
  const navigate = useNavigate();
  const { lang, articleId } = useParams();
  const { languages } = useSelector(selectArticle);
  const [isOpen, setIsOpen] = useState(false);

  const flag = languageList.find((item) => item.id === lang);
  // console.log(flag);
  const otherFlags = languageList.filter((item) => item.id !== lang);
  const flagList = isOpen ? [flag, ...otherFlags] : [flag];

  return (
    flag && (
      <div
        className="article-header__lang-wrapper"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
      >
        <ul className="flag-list">
          {flagList.map((flag) => {
            const extraClass = !languages.includes(flag.id)
              ? ' flag-list__item_disabled'
              : '';
            return (
              <li
                className={'flag-list__item' + extraClass}
                key={flag.id}
                onClick={() => navigate(`/${flag.id}/${articleId}`)}
              >
                <img className="flag" src={flag.src} alt={flag.name} />
              </li>
            );
          })}
        </ul>
      </div>
    )
  );
};

export default DropdownLanguage;
