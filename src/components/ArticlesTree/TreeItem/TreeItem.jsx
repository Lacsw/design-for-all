import React, { useState, useMemo, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentTheme } from "store/slices/theme";
import findId from "./findId";
import TreeList from "../TreeList/TreeList";
import "./TreeItem.css";

function TreeItemInner({ title, data, language }) {
  const navigate = useNavigate();
  const { articleId } = useParams();
  const theme = useSelector(getCurrentTheme);

  const hasChildren = data && typeof data === "object";
  const id = hasChildren ? data.id : data;

  // Локальный стейт для открытия/скрытия
  const [isOpen, setIsOpen] = useState(() => {
    return hasChildren && findId(data, articleId);
  });

  // При смене articleId — если наша ветка содержит этот id, открываем её
  useEffect(() => {
    if (hasChildren && findId(data, articleId)) {
      setIsOpen(true);
    }
    // (иначе ничего не трогаем — чтобы не закрывать вручную открытые юзером ветки)
  }, [articleId, data, hasChildren]);



  // останавливает всплытие, чтобы не навигировать
  const toggleOpen = (e) => {
    e.stopPropagation();
    setIsOpen((prev) => !prev);
  };

  // Навигация по клику на заголовок
  const handleClick = () => {
    navigate(`/${language}/${id || "no-article"}`);
  };

  // Для отрисовки потомков убираем поле id
  const children = useMemo(() => {
    if (!hasChildren) return null;
    return Object.entries(data).reduce((acc, [k, v]) => {
      if (k !== "id") acc[k] = v;
      return acc;
    }, {});
  }, [data, hasChildren]);

  const isActive = articleId === id;
  
  return (
    <li className={`tree-item${isOpen ? " tree-item_opened" : ""}`}>
      <div className="tree-item__top">
        {hasChildren && (
          <span
            className={"tree-item__arrow tree-item__arrow_visible_" + theme}
            onClick={toggleOpen}                    // тут кликаем стрелку
          />
        )}
        <span
          className={`tree-item__title${isActive ? " tree-item__title_active" : ""}`}
          onClick={handleClick}                   // тут кликаем на текст
        >
          {title}
        </span>
      </div>
      {hasChildren && isOpen && (
        <TreeList list={children} language={language} />
      )}
    </li>
  );
}

// Останавливаем лишние рендеры: обновляем дерево только когда изменился заголовок(title) или сами данные дерева(data) для этого заголовка
export const TreeItem = React.memo(
  TreeItemInner,
  (prev, next) => prev.title === next.title && prev.data === next.data
);