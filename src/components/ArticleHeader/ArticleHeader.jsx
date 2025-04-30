import './ArticleHeader.css';
import DropdownLanguage from 'components/DropdownLanguage/DropdownLanguage';
import DropdownEdit from 'components/DropdownEdit/DropdownEdit';
import { useSelector } from 'react-redux';
import { getCurrentUser } from 'store/slices/user';
import {
  formatTimestamp,
  formatUpdatedAt,
} from 'utils/helpers/timeFormatters.js';
import { Tooltip } from 'components';
import { useTranslation } from 'react-i18next';
import { CATALOG } from 'utils/translationKeys';

export default function ArticleHeader({ title, timeCreate, timeUpdate }) {
  const { t } = useTranslation();
  const currentUser = useSelector(getCurrentUser);
  const isAdmin =
    currentUser?.role === 'super_admin' || currentUser?.role === 'admin';

  const createDate = new Date(timeCreate * 1000).toLocaleDateString();
  const updateDate = new Date(timeUpdate * 1000).toLocaleDateString();

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
        <Tooltip title={formatTimestamp(timeCreate)} placement="top" arrow>
          <p className="article-header__timing">{t(CATALOG.HEADER.PUBLISHED)} {createDate}</p>
        </Tooltip>
        <Tooltip title={formatUpdatedAt(timeUpdate)} placement="top" arrow>
          <p className="article-header__timing">{t(CATALOG.HEADER.UPDATED)} {updateDate}</p>
        </Tooltip>
      </div>
    </>
  );
}
