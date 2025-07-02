import React from 'react';
import { TreeList } from 'components';
import './ArticlesTree.css';

function ArticlesTreeInner({ path, catalog, language }) {
  const nodes = catalog?.[language]?.[path]?.tree || [];
  if (nodes.length === 0) {
    return null;
  }

  return (
    <div className="tree">
      <TreeList nodes={nodes} language={language} />
    </div>
  );
}

export const ArticlesTree = React.memo(
  ArticlesTreeInner,
  (prev, next) =>
    prev.path === next.path &&
    prev.language === next.language &&
    prev.catalog[next.language]?.[next.path]?.tree ===
      next.catalog[next.language]?.[next.path]?.tree
);
