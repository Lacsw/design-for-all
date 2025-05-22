import React from 'react';
import { useNavigate } from 'react-router-dom';
import './UpdateCard.css';
import { useDispatch, useSelector } from 'react-redux';
import { formatTimestamp } from 'utils/helpers/timeFormatters.js';
import { Tooltip } from 'components';
import { setMainCategory, setShouldRemountTree } from 'store/slices/catalog/slice';
import { UPDATES } from 'utils/translationKeys';
import { useTranslation } from 'react-i18next';
import { getLanguage } from 'store/slices/user';

export default function UpdateCard({ update }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { t } = useTranslation();
  const language = useSelector(getLanguage);
  const timestamp = Math.floor(
    new Date(update.time_action.replace(' ', 'T')).getTime() / 1000
  );

  const handleClick = (e) => {
    e.preventDefault();

    // Обновляем состояние
    dispatch(setMainCategory(update.main_category));
    dispatch(setShouldRemountTree(true));

    // Используем React Router для навигации
    navigate(`/${update.lang}/${update.what_update || update.what_create}`);
  };
  return (
    <li className="update-card">
      <div
        className="update-card__link"
        onClick={handleClick}
      >
        <div className="update-card__titles">
          <h3 className="update-card__section-name">{update.main_category}</h3>
          <span className="update-card__path">{update.sub_category}</span>
          <span className="update-card__others">{update.title}</span>
        </div>
        <div className="update-card__info">
          <span className="update-card__others">
            {update.type === 'created'
              ? t(UPDATES.ARTICLE_TYPE.NEW)
              : update.type === 'created_lang'
                ? t(UPDATES.ARTICLE_TYPE.TRANSLATED)
                : ''}
          </span>
          <Tooltip title={formatTimestamp(timestamp, language)} placement="top" arrow>
            <span className="update-card__others">
              {update.time_action.split(' ')[0].split('-').reverse().join('.')}
            </span>
          </Tooltip>
        </div>
      </div>
    </li>
  );
}
