import React from 'react';
import { TreeList } from 'components';
import './ArticlesTree.css';


function ArticlesTreeInner({ path, catalog, language }) {
  const tree = catalog?.[language]?.[path]?.tree || {};
  return (
    <div className="tree">
      {Object.keys(tree).length > 0 && (
        <TreeList list={tree} language={language} />
      )}
    </div>
  );
}

// Останавливаем лишние рендеры: обновляем дерево только когда изменился путь(path), язык(language) или сами данные дерева(catalog[language][path].tree) для этого пути

export const ArticlesTree = React.memo(
  ArticlesTreeInner,
  (prev, next) =>
    prev.path === next.path &&
    prev.language === next.language &&
    prev.catalog[next.language]?.[next.path]?.tree ===
    next.catalog[next.language]?.[next.path]?.tree
);

