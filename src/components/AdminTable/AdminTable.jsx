import { useEffect, useRef, useState } from 'react';
import { adminHash } from 'utils/constants';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import debounce from 'utils/helpers/debounce';
import editIconB from '../../images/account/edit-icon_black.svg';
import editIconW from '../../images/account/edit-icon_white.svg';
import './AdminTable.css';
import '../AuthorArticlesList/AuthorArticlesList.css';
import { getRequests } from 'utils/api/admin';
import { useNavigate } from 'react-router-dom';

export default function AdminTable({ hash, pagination }) {
  const navigate = useNavigate();
  const theme = useSelector(getCurrentTheme);
  const bodyRef = useRef(null);
  const page = useRef(1);
  const [requestList, setRequestList] = useState([]);
  const [loading, setLoading] = useState(true);
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
      evt.target.scrollHeight -
        (evt.target.scrollTop + evt.target.offsetHeight) <
      100
    ) {
      page.current++;
      getRequests(endPoint, page.current + ';' + pagination)
        .then((data) => setRequestList((prev) => [...prev, ...data]))
        .catch((err) => console.log(err));
    }
  }

  const scrollWithDelay = debounce(handleScroll, 200);

  function handleClick(item) {
    navigate(hash + '/decision', {
      state: { type: item.type, uuid: item.uuid },
    });
  }

  useEffect(() => {
    page.current = 1;
    bodyRef.current.scrollTo(0, 0);
    setLoading(true);
    getRequests(endPoint, page.current + ';' + pagination)
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
            <th className="author-articles-list__table-header">Тип</th>
            <th className="author-articles-list__table-header">Категория</th>
            <th className="author-articles-list__table-header">Статус</th>
            <th className="author-articles-list__table-header">Язык</th>
            <th className="author-articles-list__table-header">Создано</th>
            <th className="author-articles-list__table-header">Закрыто</th>
            <th className="author-articles-list__table-header">Результат</th>
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
                  {item.who_admin === 'none' ? 'Открыто' : 'В работе'}
                </td>
                <td className="author-articles-list__table-cell">
                  {item.lang}
                </td>
                <td className="author-articles-list__table-cell">
                  {dateFormatter(item.date_create)}
                </td>
                <td className="author-articles-list__table-cell">
                  {dateFormatter(item.date_closed) || '-'}
                </td>
                <td className="author-articles-list__table-cell">
                  {item.result || '-'}
                </td>

                <td className="admin-table__button">
                  <button
                    className="author-articles-list__icon-background"
                    onClick={() => handleClick(item)}
                  >
                    <img
                      src={theme === 'dark' ? editIconB : editIconW}
                      alt={'button'}
                      className="author-articles-list__icon"
                    />
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr className="preloader-box">
              <td>Заявок нет.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
