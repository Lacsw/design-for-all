import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { TreeList } from 'components';
import './TreeItem.css';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';
import findId from './findId';

export default function TreeItem({ title, data, language, status }) {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const theme = useSelector(getCurrentTheme);
  const [isOpen, setIsOpen] = useState(() => {
    if (status === false) return false;
    return findId(data, articleId);
  });
  const hasChildren = typeof data === 'object';
  const id = hasChildren ? data.id : data;
  const newData = { ...data };
  delete newData.id;

  const arrowExtraClass = hasChildren
    ? ' tree-item__arrow_visible_' + theme
    : '';
  const liExtraClass = isOpen ? ' tree-item_opened' : '';

  function handleOpen() {
    setIsOpen((prev) => !prev);
  }

  function handleNavigate() {
    if (id) {
      navigate(`/${language}/${id}`);
    } else {
      navigate(`/${language}/no-article`);
    }
  }

  return (
    <li className={'tree-item' + liExtraClass}>
      <div className="tree-item__top">
        <span
          className={'tree-item__arrow' + arrowExtraClass}
          onClick={handleOpen}
        />
        <span className="tree-item__title" onClick={handleNavigate}>
          {title}
        </span>
      </div>
      {!isOpen || !hasChildren ? null : (
        <TreeList list={newData} language={language} status={isOpen} />
      )}
    </li>
  );
}
