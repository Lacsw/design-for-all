import { useEffect, useRef, useState } from 'react';

import './AuthorArticlesList.css';
import { SearchInput, ModalReasons, Modal, Tooltip } from 'components';
import { tableButtons, rejectHint, articleTypeOptions } from 'utils/constants';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/slices/theme';
import { useNavigate } from 'react-router-dom';
import authorApi from 'utils/api/author';
import { prepareValue } from 'utils/helpers/search';
import debounce from 'utils/helpers/debounce';
import { formatTimestamp } from 'utils/helpers/timeFormatters.js';
import { useTranslation } from 'react-i18next';
import { AUTHOR, COMMON } from 'utils/translationKeys';
import { getLanguage } from 'store/slices/user';

export default function AuthorArticlesList({
  articles,
  section,
  changeList,
  pagination,
}) {
  const navigate = useNavigate();
  const theme = useSelector(getCurrentTheme);
  const language = useSelector(getLanguage);
  const [showReason, setShowReason] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [reason, setReason] = useState({});
  const bodyRef = useRef(null);
  const page = useRef(1);
  const { t } = useTranslation();

  useEffect(() => {
    page.current = 1;
    bodyRef.current.scrollTo(0, 0);
  }, [section, pagination]);

  useEffect(() => {
    const tbody = bodyRef.current;
    tbody.addEventListener('scroll', scrollWithDelay);
    return () => tbody.removeEventListener('scroll', scrollWithDelay);
  });

  function handleScroll(evt) {
    if (
      evt.target.scrollTop > 0 &&
      evt.target.scrollHeight -
        (evt.target.scrollTop + evt.target.offsetHeight) <
        100 &&
      page.current !== 0
    ) {
      page.current++;
      authorApi
        .getArticles({ pagination, status: section, page: page.current })
        .then((data) => changeList((prev) => [...prev, ...data]))
        .catch(() => (page.current = 0));
    }
  }

  const scrollWithDelay = debounce(handleScroll, 200);

  function handleClick(article, name) {
    switch (name) {
      case 'edit':
      case 'view':
      case 'draft':
        navigate('#/author/new-article', {
          state: { name, section, draft: article.uuid, type: article.type },
        });
        break;
      case 'reason':
        toggleReason({
          message: article.reason_rejected,
          rejFields: article.rejected_fields,
        });
        break;
      case 'delete':
        setDeleteOpen(article.uuid);
        break;
      default:
        console.warn(`Wrong button's name`);
    }
  }

  function handleDelete() {
    authorApi
      .deleteDraft(deleteOpen)
      .then(() => {
        const newList = articles.filter((item) => item.uuid !== deleteOpen);
        changeList(newList);
        setDeleteOpen(false);
      })
      .catch((err) => console.warn(err));
  }

  const toggleReason = (reason) => {
    setShowReason(!showReason);
    setReason(reason);
  };

  const dateFormatter = (dateInfo) => {
    const date = new Date(dateInfo * 1000).toLocaleDateString();
    return date;
  };

  function handleSearch({ target }) {
    const value = prepareValue(target.value);
    const isReady = value.replace(/\s/g, '').length >= 3;
    if (isReady) {
      authorApi
        .searchByTitles({ status: section, text: value, pagination })
        .then(changeList)
        .catch(() => changeList([]));
    }
  }

  const searchWithDelay = debounce(handleSearch, 1000);

  return (
    <div className="author-articles-list">
      <SearchInput onChange={searchWithDelay} />
      <table className="author-articles-list__table">
        <thead className="author-articles-list__table-head">
          <tr>
            <th className="author-articles-list__table-header"> {t(AUTHOR.TABLE.HEADER_TYPE)}</th>
            <th className="author-articles-list__table-header"> {t(AUTHOR.TABLE.HEADER_LANGUAGE)}</th>
            <th className="author-articles-list__table-header"> {t(AUTHOR.TABLE.HEADER_CREATED)}</th>
            <th className="author-articles-list__table-header"> {t(AUTHOR.TABLE.HEADER_CATEGORY)}</th>
            <th className="author-articles-list__table-header">{t(AUTHOR.TABLE. HEADER_SUBCATEGORY)}</th>
            <th className="author-articles-list__table-header">{t(AUTHOR.TABLE. HEADER_TITLE)}</th>
            <th className="author-articles-list__table-header-action"></th>
            <th className="author-articles-list__table-header-action"></th>
            <th className="author-articles-list__table-header-action"></th>
          </tr>
        </thead>

        <tbody className="author-articles-list__table-body" ref={bodyRef}>
          {articles.length ? (
            articles.map((article) => (
              <tr
                key={article.uuid}
                className="author-articles-list__table-row"
              >
                <td className="author-articles-list__table-cell">
                  {t(articleTypeOptions.find(option => option.value === article.type)?.translationKey || '')}
                  {article.rejected_fields && (
                    <Tooltip title={t(AUTHOR.TABLE.PARTIALLY_REJECTED)} placement="top" arrow>
                      <img
                        src={rejectHint[theme]}
                        alt={rejectHint.name}
                        className="author-articles-list__warning"
                      />
                    </Tooltip>
                  )}
                </td>
                <td className="author-articles-list__table-cell">
                  {article.lang && t(COMMON.LANGUAGE[article.lang.toUpperCase()])}
                </td>

                <Tooltip
                  title={formatTimestamp(article.date_create, language)}
                  placement="top"
                  arrow
                >
                  <td className="author-articles-list__table-cell">
                    {dateFormatter(article.date_create)}
                  </td>
                </Tooltip>

                <td className="author-articles-list__table-cell">
                  {article.main_category}
                </td>

                <Tooltip title={article.sub_category} placement="top" arrow>
                  <td className="author-articles-list__table-cell">
                    {article.sub_category}
                  </td>
                </Tooltip>

                <Tooltip title={article.title} placement="top" arrow>
                  <td className="author-articles-list__table-cell">
                    {article.title}
                  </td>
                </Tooltip>

                {tableButtons[section].map((item, i) => {
                  if (
                    !item ||
                    (!article.reason_rejected && item.name === 'reason')
                  )
                    return (
                      <td
                        key={i}
                        className="author-articles-list__table-cell-buttons"
                      ></td>
                    );
                  return (
                    <td
                      key={item.name}
                      className="author-articles-list__table-cell-buttons"
                    >
                      <Tooltip title={t(item.tooltip)} placement="top" arrow>
                        <button
                          className="author-articles-list__icon-background"
                          onClick={() => handleClick(article, item.name)}
                        >
                          <img
                            src={item[theme]}
                            alt={item.name}
                            className="author-articles-list__icon"
                          />
                        </button>
                      </Tooltip>
                    </td>
                  );
                })}
              </tr>
            ))
          ) : (
            <tr>
              <td>{t(AUTHOR.TABLE.EMPTY_CATEGORY)}</td>
            </tr>
          )}
        </tbody>
      </table>
      <ModalReasons
        title={t(AUTHOR.TABLE.REASON_TITLE)}
        isOpen={showReason}
        onClose={() => toggleReason({})}
        rejFields={reason.rejFields}
      >
        <div className="reject-textbox">
          {reason.message &&
            reason.message.split('\n').map((text, i) => (
              <p key={i} className="reject-text reject-text_14">
                {text}
              </p>
            ))}
        </div>
      </ModalReasons>
      <Modal
        title={t(AUTHOR.TABLE.DELETE_TITLE)}
        isOpen={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        onConfirm={handleDelete}
        twoBtns
      />
    </div>
  );
}
