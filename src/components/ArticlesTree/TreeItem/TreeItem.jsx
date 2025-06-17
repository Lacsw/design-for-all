import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentTheme } from 'store/slices/theme';
import findInTree from './findInTree';
import TreeList from '../TreeList/TreeList';
import './TreeItem.css';
import {
  setCurrentSubCategory,
  selectCurrentSubCategory,
} from 'store/slices/catalog/slice';

function TreeItemInner({
  title,
  id,
  children: childrenNodes,
  nodeKey,
  language,
}) {
  const { articleId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(getCurrentTheme);
  const currentSub = useSelector(selectCurrentSubCategory);

  const hasChildren = childrenNodes.length > 0;
  const isActive = articleId === id || nodeKey === currentSub;

  // Локальный стейт для открытия/скрытия ветки
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // если текущий узел или любой его потомок совпадает с articleId — раскрываем
    if (id === articleId || findInTree(childrenNodes, articleId)) {
      setIsOpen(true);
    }
  }, [articleId, childrenNodes, id]);

  useEffect(() => {
    // Открываем ветку, если она содержит активный элемент
    if (isActive) setIsOpen(true);
  }, [isActive]);

  // останавливает всплытие, чтобы не навигировать
  const toggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClick = () => {
    dispatch(setCurrentSubCategory(nodeKey));
    navigate(`/${language}/${id || 'no-article'}`);
  };

  return (
    <li className={`tree-item${isOpen ? ' tree-item_opened' : ''}`}>
      <div className="tree-item__top">
        {hasChildren && (
          <span
            className={'tree-item__arrow tree-item__arrow_visible_' + theme}
            onClick={toggleOpen} // тут кликаем стрелку
          />
        )}
        <span
          className={`tree-item__title${
            isActive ? ' tree-item__title_active' : ''
          }`}
          onClick={handleClick} // тут кликаем на текст
        >
          {title}
        </span>
      </div>
      {hasChildren && isOpen && (
        <TreeList nodes={childrenNodes} language={language} />
      )}
    </li>
  );
}

export const TreeItem = React.memo(
  TreeItemInner,
  (prev, next) =>
    prev.title === next.title &&
    prev.id === next.id &&
    prev.nodeKey === next.nodeKey &&
    prev.childrenNodes === next.childrenNodes
);
