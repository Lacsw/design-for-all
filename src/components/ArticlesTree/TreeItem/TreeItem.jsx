import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TreeList } from 'components';
import './TreeItem.css';
import { useSelector } from 'react-redux';
import { getCurrentTheme } from 'store/selectors';

export default function TreeItem({ title, data, language }) {
  const navigate = useNavigate();
  const theme = useSelector(getCurrentTheme);
  const [isOpen, setIsOpen] = useState(false);
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
        <TreeList list={newData} language={language} />
      )}
    </li>
  );
}
