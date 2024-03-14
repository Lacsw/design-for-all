import { useState } from 'react';
import { Link } from 'react-router-dom';

import './AuthorArticlesList.css';
import view from 'images/account/view-icon.svg';
import draft from 'images/account/draft-icon.svg';
import reason from 'images/account/reason-deny-icon.svg';
import { SearchInput, ModalReasons } from 'components';

export default function AuthorArticlesList({ articles }) {
  const [showReason, setShowReason] = useState(false);
  const [reasonMessage, setReasonMessage] = useState('');

  const toggleReason = (reasonMessage) => {
    setShowReason(!showReason);
    setReasonMessage(reasonMessage);
  };

  const dateFormatter = (dateInfo) => {
    const date = new Date(dateInfo);
    return `${date.getDate()}.${('0' + (date.getMonth() + 1)).slice(
      -2
    )}.${date.getFullYear()}`;
  };

  return (
    <div className="author-articles-list">
      <SearchInput />
      <table className="author-articles-list__table">
        <thead className="author-articles-list__table-head">
          <tr>
            <th className="author-articles-list__table-header">Тип</th>
            <th className="author-articles-list__table-header">Язык</th>
            <th className="author-articles-list__table-header">Дата</th>
            <th className="author-articles-list__table-header">Категория</th>
            <th className="author-articles-list__table-header">Подкатегория</th>
            <th className="author-articles-list__table-header">Заголовок</th>
            <th className="author-articles-list__table-header-action"></th>
            <th className="author-articles-list__table-header-action"></th>
            <th className="author-articles-list__table-header-action"></th>
          </tr>
        </thead>

        <tbody className="author-articles-list__table-body">
          {articles ? (
            articles.map((article) => (
              <tr
                key={article.uuid}
                className="author-articles-list__table-row"
              >
                <td className="author-articles-list__table-cell">
                  {article.type}
                  {article.reason_rejected && (
                    <div className="author-articles-list__warning">
                      <span className="author-articles-list__warning-text">
                        Частично отклонено
                      </span>
                    </div>
                  )}
                </td>
                <td className="author-articles-list__table-cell">
                  {article.lang}
                </td>
                <td className="author-articles-list__table-cell">
                  {dateFormatter(article.date_create)}
                </td>
                <td className="author-articles-list__table-cell">
                  {article.main_category}
                </td>
                <td className="author-articles-list__table-cell">
                  {article.sub_category}
                </td>
                <td className="author-articles-list__table-cell">
                  {article.title}
                </td>
                <td className="author-articles-list__table-cell-buttons">
                  <Link
                    to={`/articles/${article.lang}/${article.uuid}`}
                    className="author-articles-list__icon-background"
                  >
                    <img
                      src={view}
                      alt="Иконка просмотра"
                      className="author-articles-list__icon"
                    />
                  </Link>
                </td>
                <td className="author-articles-list__table-cell-buttons">
                  <button className="author-articles-list__icon-background">
                    <img
                      src={draft}
                      alt="Иконка в черновик"
                      className="author-articles-list__icon"
                    />
                  </button>
                </td>
                <td className="author-articles-list__table-cell-buttons">
                  {article.reason_rejected && (
                    <button
                      className="author-articles-list__icon-background"
                      onClick={() => toggleReason(article.reason_rejected)}
                    >
                      <img
                        src={reason}
                        alt="Иконка причины отказа"
                        className="author-articles-list__icon"
                      />
                    </button>
                  )}
                </td>
              </tr>
            ))
          ) : (
            <p>
              Упс, пусто. <br />
              Здесь скоро будут предложения.
            </p>
          )}
        </tbody>
      </table>
      <ModalReasons
        title={'Причина'}
        isOpen={showReason}
        onClose={() => toggleReason('')}
      >
        {reasonMessage}
      </ModalReasons>
    </div>
  );
}
