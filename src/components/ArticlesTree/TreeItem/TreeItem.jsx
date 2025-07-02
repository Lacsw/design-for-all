import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentTheme } from 'store/slices/theme';
import findInTree from './findInTree';
import TreeList from '../TreeList/TreeList';
import './TreeItem.css';
import {
  setCurrentSubCategory,
  selectCurrentSubCategory,
  selectCurrentCategory,
} from 'store/slices/catalog/slice';

function TreeItemInner({
  title,
  id,
  children: childrenNodes,
  nodeKey,
  language,
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useSelector(getCurrentTheme);
  const currentSub = useSelector(selectCurrentSubCategory);
  const currentCategory = useSelector(selectCurrentCategory);
  const hasChildren = childrenNodes.length > 0;
  const isActive = nodeKey === currentSub;
  // Локальный стейт для открытия/скрытия ветки
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isActive || findInTree(childrenNodes, currentSub)) {
      setIsOpen(true);
    }
  }, [currentSub, childrenNodes, isActive]);

  // останавливает всплытие, чтобы не навигировать
  const toggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  const handleClick = () => {
    navigate(
      `/${language}/${
        id || `no-article?category=${currentCategory}&subcategory=${nodeKey}`
      }`
    );
    dispatch(setCurrentSubCategory(nodeKey));
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
