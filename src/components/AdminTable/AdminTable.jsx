import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';
import { getCurrentTheme } from 'store/slices/theme';
import debounce from 'utils/helpers/debounce';
import './AdminTable.css';
import '../AuthorArticlesList/AuthorArticlesList.css';
import adminApi from 'utils/api/admin';
import { editButton, viewButton, adminHash } from 'utils/constants';
import { ADMIN } from 'utils/translationKeys';
import { Tooltip } from 'components';
import { formatTimestamp } from 'utils/helpers/timeFormatters';

export default function AdminTable({ hash, pagination }) {
  const navigate = useNavigate();
  const theme = useSelector(getCurrentTheme);
  const bodyRef = useRef(null);
  const page = useRef(1);
  const [requestList, setRequestList] = useState([]);
  const [loading, setLoading] = useState(true);
  const { t } = useTranslation();
  const button = hash === adminHash.closed ? viewButton : editButton;
  const endPoint =
    hash === adminHash.accounts
      ? 'statements_author_account'
      : hash === adminHash.creates
      ? 'creates_p'
      : hash === adminHash.updates
      ? 'updates_p'
      : 'closed_p';

  function handleScroll(evt) {
    if (
      evt.target.scrollTop > 0 &&
      evt.target.scrollHeight -
        (evt.target.scrollTop + evt.target.offsetHeight) <
        100 &&
      page.current !== 0
    ) {
      page.current++;
      adminApi
        .getRequests(endPoint, page.current + ';' + pagination)
        .then((data) => setRequestList((prev) => [...prev, ...data]))
        .catch(() => (page.current = 0));
    }
  }

  const scrollWithDelay = debounce(handleScroll, 200);

  function handleClick(item) {
    if (item.date_closed) {
      navigate(hash + '/view', {
        state: { type: item.type, uuid: item.uuid, status: item.status },
      });
      return;
    }
    navigate(hash + '/decision', {
      state: { type: item.type, uuid: item.uuid },
    });
  }

  useEffect(() => {
    page.current = 1;
    bodyRef.current.scrollTo(0, 0);
    setLoading(true);
    adminApi
      .getRequests(endPoint, page.current + ';' + pagination)
      .then(setRequestList)
      .catch(() => setRequestList([]))
      .finally(() => setLoading(false));
  }, [endPoint, pagination]);

  useEffect(() => {
    const tbody = bodyRef.current;
    tbody.addEventListener('scroll', scrollWithDelay);
    return () => tbody.removeEventListener('scroll', scrollWithDelay);
  }, [scrollWithDelay]);

  const dateFormatter = (dateInfo) => {
    if (!dateInfo) return null;
    const date = new Date(dateInfo * 1000).toLocaleDateString();
    return date;
  };

  return (
    <div className="author-articles-list">
      <table className="author-articles-list__table">
        <thead className="author-articles-list__table-head">
          <tr>
            <th className="author-articles-list__table-header">
              {t(ADMIN.TABLE.HEADER_TYPE)}
            </th>
            <th className="author-articles-list__table-header">
              {t(ADMIN.TABLE.HEADER_CATEGORY)}
            </th>
            <th className="author-articles-list__table-header">
              {t(ADMIN.TABLE.HEADER_STATUS)}
            </th>
            <th className="author-articles-list__table-header">
              {t(ADMIN.TABLE.HEADER_LANGUAGE)}
            </th>
            <th className="author-articles-list__table-header">
              {t(ADMIN.TABLE.HEADER_CREATED)}
            </th>
            <th className="author-articles-list__table-header">
              {t(ADMIN.TABLE.HEADER_CLOSED)}
            </th>
            <th className="author-articles-list__table-header">
              {t(ADMIN.TABLE.HEADER_RESULT)}
            </th>
            <th className="author-articles-list__table-header-action"></th>
          </tr>
        </thead>

        <tbody className="author-articles-list__table-body" ref={bodyRef}>
          {loading ? (
            <tr className="preloader-box">
              <td className="preloader" />
            </tr>
          ) : requestList.length ? (
            requestList.map((item) => (
              <tr key={item.uuid} className="author-articles-list__table-row">
                <td className="author-articles-list__table-cell">
                  {item.type}
                </td>
                <td className="author-articles-list__table-cell">
                  {item.main_category || '-'}
                </td>
                <td className="author-articles-list__table-cell">
                  {item.date_closed
                    ? t(ADMIN.TABLE.CLOSED)
                    : item.who_admin === 'none'
                    ? t(ADMIN.TABLE.OPEN)
                    : t(ADMIN.TABLE.IN_WORK)}
                </td>
                <td className="author-articles-list__table-cell">
                  {item.lang}
                </td>
                <Tooltip
                  title={formatTimestamp(item.date_create, i18n.language)}
                  placement="top"
                  arrow
                >
                  <td className="author-articles-list__table-cell">
                    {dateFormatter(item.date_create, i18n.language)}
                  </td>
                </Tooltip>
                {item.date_closed ? (
                  <Tooltip
                    title={formatTimestamp(item.date_closed, i18n.language)}
                    placement="top"
                    arrow
                  >
                    <td className="author-articles-list__table-cell">
                      {dateFormatter(item.date_closed)}
                    </td>
                  </Tooltip>
                ) : (
                  <td className="author-articles-list__table-cell">-</td>
                )}
                <td className="author-articles-list__table-cell">
                  {item.date_closed ? item.status : '-'}
                </td>

                <td className="admin-table__button">
                  <button
                    className="author-articles-list__icon-background"
                    onClick={() => handleClick(item)}
                    title={t(button.tooltip)}
                  >
                    <img
                      src={button[theme]}
                      alt={'button'}
                      className="author-articles-list__icon"
                    />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="preloader-box">
              <td>{t(ADMIN.TABLE.NO_REQUESTS)}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
