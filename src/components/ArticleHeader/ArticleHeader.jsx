import './ArticleHeader.css';
import DropdownLanguage from 'components/DropdownLanguage/DropdownLanguage';
import DropdownEdit from 'components/DropdownEdit/DropdownEdit';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'store/slices/user';
import { useTranslation } from 'react-i18next';
import { CATALOG } from 'utils/translationKeys';

export default function ArticleHeader({ title, timeCreate, timeUpdate }) {
  const { t } = useTranslation();
  const currentUser = useSelector(getCurrentUser);
  const isAdmin =
    currentUser?.role === 'super_admin' || currentUser?.role === 'admin';

  return (
    <>
      <div className="article-header">
        <h2 className="article-header__title">{title}</h2>
        <div className="article-header__icon-container">
          <DropdownLanguage />
          {!isAdmin && <DropdownEdit />}
        </div>
      </div>
      <div className="article-header__timing-container">
        <p className="article-header__timing">{t(CATALOG.HEADER.PUBLISHED)} {timeCreate}</p>
        <p className="article-header__timing">{t(CATALOG.HEADER.UPDATED)} {timeUpdate}</p>
      </div>
    </>
  );
}
